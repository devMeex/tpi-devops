pipeline {
	agent { label 'devops2'} // contenedor de docker,kubectl
	
	environment {
        // definir todo en la parte de credenciales de jenkins por medio de secret_text o user_and_password
	    kubernetes_server = "https://10.0.2.10:6443"
	    kubernetes_token = credentials('k8s-token')
	    docker_hub_ingreso = 'docker_hub_id'
	    docker_hub_user = 'gondragon'
	       
	}
	
	
	stages {
        stage('Building...') {
            steps {
                echo 'Building ...'
                container('docker') {
                    script {
                        imagen_my_app = docker.build("${docker_hub_user}/my_app:${BUILD_NUMBER}")
                        docker.withRegistry('', docker_hub_ingreso) { 
                            if (env.BRANCH_NAME == 'main') {
                                imagen_my_app.push('latest')
                            }
                            if (env.BRANCH_NAME == 'dev') {
                                imagen_my_app.push()
                                imagen_my_app.push('dev')
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                container('kubectl') {
                    script {
                        if (env.BRANCH_NAME == 'main') {
                            sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify apply -f man_main.yaml'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/back-api  -n my-app-main'
                        }
                        if (env.BRANCH_NAME == 'dev') {
                            sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify apply -f man_dev.yaml'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/back-api -n my-app-dev'
                        }
                        
                    }
                }
            }
        }
	}
}