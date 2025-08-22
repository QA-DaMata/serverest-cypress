pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'master', url: 'https://github.com/QA-DaMata/serverest-cypress.git'
                bat 'npm install'
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm run init-proj'
            }
        }
        stage('Executar teste') {
            steps {
               bat '''NO_COLOR=1 npx cypress run'''
            }
        }
    }
}