pipeline {
	agent { label 'devops2'} // contenedor de docker,kubectl
	
	environment {
        // definir todo en la parte de credenciales de jenkins por medio de secret_text o user_and_password
	    kubernetes_server = "https://10.0.2.10:6443"
	    kubernetes_token = credentials('k8s-token')
	    docker_hub_ingreso = credentials('docker_hub_id')
	    docker_hub_user = 'gondragon'
	    user_DB = credentials('user_DB') // root     -> para el manifiest usar encode64= cm9vdA==
	    pass_DB = credentials('user_pass_DB') // 1234 ->para el manifiest usar encode64= MTIzNA==
	    port_DB = credentials('port_DB') // 3606
	    name_DB = credentials('name_BD') // peliculas_DB ->para el manifiest usar encode64= cGVsaWN1bGFzX0RC
	    ip_host_DB_dev = credentials('ip_host_DB_dev')  
	    ip_host_DB_main = credentials('ip_host_DB_main')
	    
	    
	    
	}
	
	
	stages {
        stage('Building...') {
            steps {
                echo 'Building ...'
                container('docker') {
                    script {
                        imagen_my_app = docker.build("${docker_hub_user}/my-app:${BUILD_NUMBER}", "./my-app")
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

	    

		stage('DB-migration') {  // ver que container puede servir para realizar la migracion , aca usa uno que se llama dotnet
            steps {
                echo 'Updating DB...'
                container('dotnet') {
				
                    script {
						if (env.BRANCH_NAME == 'main') {
							sh 'cd ./my-app && dotnet ef migrations list && DB_HOST=${db_host_prod} DB_PORT=${port_DB} MYSQL_USER=${user_DB} MYSQL_PASSWORD=${pass_DB} MYSQL_DB=${name_DB} dotnet ef database update'
						}
                        if (env.BRANCH_NAME == 'dev') {
							sh 'cd ./my-app && dotnet ef migrations list && DB_HOST=${db_host_dev} DB_PORT=${port_DB} MYSQL_USER=${user_DB} MYSQL_PASSWORD=${pass_DB} MYSQL_DB=${name_DB} dotnet ef database update'
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
                            sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify apply -f manifest_main.yaml'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/my-app-deployment  -n my-app-main'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/my-app-deployment  -n my-app-main'
                        }
                        if (env.BRANCH_NAME == 'dev') {
                            sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify apply -f manifest_dev.yaml'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/my-app-deployment  -n my-app-dev'
							sh 'kubectl --server=${kubernetes_server} --token=${kubernetes_token} --insecure-skip-tls-verify rollout restart deployment/my-app-deployment  -n my-app-dev'
                        }
                        
                    }
                }
            }
        }
	}
}