package microservice

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class UploadFileSimulation extends Simulation {
  val config = ConfigFactory.load("application")
  var baseUrl = config.getString("url.baseUrl")
  var baseAuthUrl = config.getString("url.baseAuthUrl")
  var username = config.getString("oauth2.username")
  var password = config.getString("oauth2.password")
  var client_id = config.getString("oauth2.client_id")
  var client_secret = config.getString("oauth2.client_secret")

  val httpProtocol = http
    .baseUrl(baseUrl)
    .inferHtmlResources(AllowList(), DenyList())
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("PostmanRuntime/7.28.4")

  var token = ""
  val headersLogin = Map(
    "Cache-Control" -> "no-cache",
    "Postman-Token" -> "a435098d-aa46-4824-970f-756a972d44ce")

  val feeder = csv("users.csv").circular

  val auth = scenario("GetToken")
      .exec(http("authenticate")
        .post(baseAuthUrl + "/auth-api/connect/token")
        .headers(headersLogin)
        .formParam("grant_type", "password")
        .formParam("username", username)
        .formParam("password", password)
        .formParam("client_id", client_id)
        .formParam("client_secret", client_secret)
        .check(status.is(200))
        .check(jsonPath("$.access_token").saveAs("access")))
        .exec{session => { token = session("access").as[String]
          session}}

  object BusinessLogic {
    var headers_10 = Map("Content-Type" -> "multipart/form-data; charset=ISO-8859-1",
                        "Authorization" -> "Bearer ${token}")
    val postfile =
      feed(feeder)
        .exec(http("PostFile")
        .post("/sales/File")
        .headers(headers_10.toMap)
        .bodyPart(RawFileBodyPart("", "Arch9168#{Id}.xlsx"))
        .check(status.is(200))
      )
  }

  val scn = scenario("postfile")
    .exec(session => session.set("access", token))
    .exec(
      BusinessLogic.postfile
    )

  setUp(
    auth.inject(constantUsersPerSec(1) during (1 seconds)),
    scn.inject(
      atOnceUsers(1)
      // rampUsers(1) during (20)
  )).protocols(httpProtocol)
}
