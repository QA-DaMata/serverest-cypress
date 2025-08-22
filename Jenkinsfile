pipeline{
    agent any

    stages {
        stage('Clonar repositorio'){
            steps {
                git branch 'master', url: 'https://github.com/QA-DaMata/serverest-cypress.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Iniciar o serverest') {
            steps {
                sh 'NO_COLOR=1 npm run init-proj'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}