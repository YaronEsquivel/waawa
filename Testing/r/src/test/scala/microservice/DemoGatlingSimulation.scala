package microservice

import com.typesafe.config.ConfigFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import com.typesafe.config.ConfigFactory
import Constants.Constants

class DemoGatlingSimulation extends Simulation {

  //Used to load variables from a configuration file
  val config = ConfigFactory.load("application")

  //METHOD_NAMES
  val GetUserById ="GetUserById"
  val DeleteUser="DeleteUser"
  val CreateUser="CreateUser"
  val UpdateUser="UpdateUser"

  //URL del api 
  val baseUrl = config.getString("demoGatling.baseUrl")


  //Initial configuration for HTTP request using baseUrl
  val httpProtocol = http.baseUrl(baseUrl) 

  object GatlingUserCalls {
    val byId= exec(http(GetUserById)
       .get(Constants.URI_USER +"/1")
       .check(status.is(200))
      )

    val delete= exec(
      http(DeleteUser)
       .delete(Constants.URI_USER +"/1")
       .check(status.is(200))
      )

    val createUser = exec(
      http(CreateUser)
       .post(Constants.URI_USER)
       .header(Constants.HEADER_ACCEPT , Constants.TEXT_PLAIN)
       .header(Constants.CONTENT_HEADER, Constants.APPLICATION_JSON)
       .body(StringBody("""{"userName": "Erandy",  "lastName": "Lugo",  "createdDate": "2023-07-10T23:53:09.969Z",  "birthDate": "2023-07-10T23:53:09.969Z",  "email": "erandy.ramirez@axity.com"}""")).asJson
       .check(status.is(200))
      )

    val updateUser = exec(
      http(UpdateUser)
       .put(Constants.URI_USER)
       .header(Constants.HEADER_ACCEPT , Constants.TEXT_PLAIN)
       .header(Constants.CONTENT_HEADER, Constants.APPLICATION_JSON)
       .body(StringBody("""{"userName": "Erandy",  "lastName": "Ramirez",  "createdDate": "2023-07-10T23:53:09.969Z",  "birthDate": "2023-07-10T23:53:09.969Z",  "email": "erandy.ramirez@axity.com"}""")).asJson
       .check(status.is(200))
      )  

    val getPing= exec(
      http("ping")
       .get("/ping")
       .check(status.is(200))
      )
  }

 val scn = scenario("Users test")
     .pause(5)
     .exec(
      GatlingUserCalls.byId,
      GatlingUserCalls.delete,
      GatlingUserCalls.createUser,
      GatlingUserCalls.updateUser,
      GatlingUserCalls.getPing
     
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

//mvn gatling:test -Dgatling.simulationClass=microservice.DemoGatling