package microservice.consumes

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory
import Constants.Constants

object CreateForms{

  //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

   //URL del api 
  var baseUrl = config.getString("urlForms.baseUrl")

    //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http
    .baseUrl(baseUrl) 

 object FormsCalls {
    val createForms = exec(
      http("CreateForms")
       .post(Constants.BASE_URL_API_FORMS)
       .header(Constants.HEADER_ACCEPT , Constants.TEXT_PLAIN)
       .header(Constants.CONTENT_HEADER, Constants.APPLICATION_JSON)
       .body(RawFileBody(Constants.FORM_BODY_CREATE_JSON)).asJson
       .check(jsonPath("$.body.id").saveAs(Constants.FORM_ID_PARAMETER_NAME)) 
       .check(status.is(201))
      )
  }
  
  def CreateForms() = scenario("CreateForms")
     .pause(5)
     .exec(
      FormsCalls.createForms,
    )
  }