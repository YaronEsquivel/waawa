package microservice.consumes

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory
import Constants.Constants

object GetAllForms{

  //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

   //URL del api 
  var baseUrl = config.getString("urlForms.baseUrl")

    //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http
    .baseUrl(baseUrl) 

 object FormsCalls {
    val all= exec(
      http("GetForms")
       .get(Constants.BASE_URL_API_FORMS)
       .check(status.is(200))
      )
  }

  def GetAllForms() = scenario("GetAllForms")
     .pause(5)
     .exec(
      FormsCalls.all,
    )
  }