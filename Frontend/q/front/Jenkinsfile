pipeline {
  agent {
    label 'macOS'
  }
  environment {
    //Functions
    DEPLOY_PATTERN = NewPatterName()

    // Projtect configurations
    COMPANY = "Axity"
    COMPANY_LOWERCASE = "axity"
    PROJECT_NAME = "angular-archetype"
    PROJECT_NAME_LOWERCASE = "angular-archetype"
    SLACK_CHANNEL = "#"
    ENVIRONMENT = "Dev"

    // General configurations
    SONAR_KEY = "22_axity_angular_archetype";
    SONAR_SERVER = "https://devtools.axity.com/sonarlts";
    SONAR_TOKEN = "d54f4f0b0ecc98ca94c88640833783fe52216269";
  }
  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing Dependencies'
        sh 'npm ci'
      }
    }
    stage('Sonar Frontend Mobile') {
      steps {
        sh 'npm run lint'
        sh 'npm run test-ci'
        sh "sonar-scanner \
          -Dsonar.projectKey=${SONAR_KEY} \
          -Dsonar.host.url=${SONAR_SERVER} \
          -Dsonar.login=${SONAR_TOKEN} \
          -Dsonar.sourceEncoding=UTF-8 \
          -Dsonar.sources=src/app \
          -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.module.ts,**/app.child.imports.ts \
          -Dsonar.tests=src \
          -Dsonar.test.inclusions=**/*.spec.ts \
          -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info"
      }
    }
  }
  post {
    always {
      echo 'Finished'
      cleanWs()
      // echo 'Slack'
      // SlackMsg(currentBuild.currentResult)
    }
    success {
      echo 'I succeeeded!'
    }
    unstable {
      echo 'I am unstable :/'
    }
    failure {
      echo 'I failed :('
    }
    changed {
      echo 'Things were different before...'
    }
  }
}

def NewPatterName() {
  return "_" + new Date().format('ddMMyyyy') + "_" + "${env.BUILD_NUMBER}";
}

def SlackMsg(String buildResult) {
  String message = "Compilation result ${env.BUILD_DISPLAY_NAME} for job  \"${env.JOB_NAME}\"  is " + buildResult + " launched by ${env.COMMITER_EMAIL}. For more details got to ${env.JOB_URL}"
  echo "${env.BUILD_DISPLAY_NAME}"

  if (buildResult == "SUCCESS") {
    slackSend channel: "${SLACK_CHANNEL}", color: "good", message: message
  } else if (buildResult == "UNSTABLE") {
    slackSend channel: "${SLACK_CHANNEL}", color: "warning", message: message
  } else {
    slackSend channel: "${SLACK_CHANNEL}", color: "danger", message: message
  }
}
