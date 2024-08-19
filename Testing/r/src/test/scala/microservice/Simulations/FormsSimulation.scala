package microservice.simulations

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory

import microservice.consumes.GetAllForms.GetAllForms
import microservice.consumes.CreateForms.CreateForms
import microservice.consumes.UpdateForms.UpdateForms
import microservice.consumes.DeleteForms.DeleteForms

class FormsSimulation extends Simulation{

 //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

   //URL del api 
  var baseUrl = config.getString("urlForms.baseUrl")

    //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http
    .baseUrl(baseUrl) 

  object CreateFormsCalls {
    val all= exec(
      GetAllForms()
      )

    val createForms = exec(
      CreateForms()
      )

    val updateForms = exec(
      UpdateForms()
    )

    val deleteForms = exec(
      DeleteForms()
    )
  }

 val scn = scenario("Forms Create")
     .pause(5)
     .exec(
        CreateFormsCalls.all,
        CreateFormsCalls.createForms,
        CreateFormsCalls.updateForms,
        CreateFormsCalls.deleteForms
    )
 
  setUp(
  scn.inject(
  // 1 -Pause for a given duration.
    //nothingFor(1), 
  // 2 -Injects a given number of users at once.
    //atOnceUsers(1), 
  // 3 -Injects a given number of users distributed evenly on a time window of a given duration.
    //rampUsers(1).during(5),
  // 4 -Injects users at a constant rate, defined in users per second, during a given duration.
    //constantUsersPerSec(1).during(1) 
  // 5 -Injects users at a constant rate, defined in users per second, during a given duration.
    //constantUsersPerSec(20).during(15).randomized, 
  // 6 -Injects users from starting rate to target rate, defined in users per second, during a given duration.
    //rampUsersPerSec(10).to(10).during(1.minutes), 
  // 7 -Injects users from starting rate to target rate, defined in users per second, during a given duration.
    rampUsersPerSec(1).to(5).during(1.minutes).randomized, 
  // 8 -Injects a given number of users following a smooth approximation of the heaviside step function stretched to a given duration.
    //stressPeakUsers(10).during(1) 
  ).protocols(httpProtocol)
  )

}