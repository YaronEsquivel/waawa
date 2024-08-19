package microservice

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory
import Constants.Constants

class DemoGatlingDeleteUser extends Simulation {

  //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

  //Api URL 
  val baseUrl = config.getString("demoGatling.baseUrl")

  //METHOD_NAMES
  val DeleteUser="DeleteUser"

  //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http
    .baseUrl(baseUrl) 

    val delete= exec(
      http(DeleteUser)
       .delete(Constants.URI_USER + "/1")
       .check(status.is(200))
      )

 val scn = scenario("Users test Delete")
     .pause(5)
     .exec(delete)
 
  setUp(
  scn.inject(
  // 1 -Pause for a given duration.
    //nothingFor(4), 
  // 2 -Injects a given number of users at once.
    //atOnceUsers(10), 
  // 3 -Injects a given number of users distributed evenly on a time window of a given duration.
    //rampUsers(10).during(5),
  // 4 -Injects users at a constant rate, defined in users per second, during a given duration.
    constantUsersPerSec(1).during(1) 
  // 5 -Injects users at a constant rate, defined in users per second, during a given duration.
    //constantUsersPerSec(20).during(15).randomized, 
  // 6 -Injects users from starting rate to target rate, defined in users per second, during a given duration.
    //rampUsersPerSec(10).to(20).during(10.minutes), 
  // 7 -Injects users from starting rate to target rate, defined in users per second, during a given duration.
    //rampUsersPerSec(10).to(20).during(10.minutes).randomized, 
  // 8 -Injects a given number of users following a smooth approximation of the heaviside step function stretched to a given duration.
    //stressPeakUsers(1000).during(20)
  ).protocols(httpProtocol)
  )
}

//mvn gatling:test -Dgatling.simulationClass=microservice.DemoGatlingDeleteUser