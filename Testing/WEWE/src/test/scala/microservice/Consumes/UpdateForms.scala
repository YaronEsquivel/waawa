package microservice.consumes

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory
import Constants.Constants

object UpdateForms{

  //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

   //URL del api 
  var baseUrl = config.getString("urlForms.baseUrl")

    //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http
    .baseUrl(baseUrl) 

 object FormsCalls {

    val updateForms = exec(
      http("UpdateForms")
       .put(Constants.BASE_URL_API_FORMS + "/#{" + Constants.FORM_ID_PARAMETER_NAME + "}")
       .header(Constants.HEADER_ACCEPT , Constants.TEXT_PLAIN)
       .header(Constants.CONTENT_HEADER, Constants.APPLICATION_JSON)
       .body(RawFileBody(Constants.FORM_BODY_UPDATE_JSON)).asJson
       .check(status.is(200))
      )
  }
  
  def UpdateForms() = scenario("UpdateForms")
     .pause(5)
     .exec(
      FormsCalls.updateForms,
    )
  }