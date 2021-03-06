<h1>cQube</h1>

<b>Prerequisites to install cQube:</b>
- ubuntu 18.04 (supported)
- 32GB of System RAM (minimum requirement)
- 8 core CPU (minimum requirement)
- Domain name (with SSL)
- 1 TB Storage  

<b>Reverse proxy rules</b>
The following ports have to be configured in the nginix server with reverse proxy:
1) Port 4200 should be proxied to the '/' 
2) Port 8080 should be proxied to the '/auth'
3) Port 3000 should be proxied to the '/api'
4) Port 8000 should be proxied to the '/data'

<b>Nginx - cQube server firewall configuration</b>
1) Port 4200 should be open from nginx to the cQube server
2) Port 8080 should be open from nginx to the cQube server
3) Port 3000 should be open from nginx to the cQube server
4) Port 8000 should be open from nginx to the cQube server

<b>Openvpn - cQube server firewall configuration</b>
1) Port 9000 should be open from openvpn to the cQube server
2) Port 4201 should be open from openvpn to the cQube server
3) Port 3001 should be open from openvpn to the cQube server

Note: For <b>Installation:</b> follow the below steps directly, for upgradation follow the <b>Upgradation:</b> steps mentioned in the last section.

<h2>Installation:</h2>

- Open Terminal
- Navigate to the directory where cQube has been downloaded or cloned 
```
cd cQube/ansible/installation_scripts/
git checkout release-2.0
```
- Copy the config.yml.template to config.yml 
`cp config.yml.template config.yml`
- Edit using `nano config.yml`
- Fill the configuration details for the below mentioned list in `config.yml` (* all the values are mandatory)
- cQube installation process installs the components in a sequence as mentioned below:
  - Installs Ansible
  - Installs Openjdk
  - Installs Python, pip and flask
  - Installs Postgresql
  - Installs NodeJS
  - Installs Angular and Chart JS
  - Installs Apache Nifi
  - Installs Keycloak
  - Installs Grafana
  - Installs Prometheus and node exporter

- Save and Close the file

- Give the following permission to the install.sh file
```
chmod u+x install.sh
```
- Install cQube using the non-root user with sudo privilege
- Configuration filled in `config.yml` will be validated first. If there is any error during validation, you will be prompted with the appropriate error message and the installation will be aborted. Refer the error message and solve the errors appropriately, then re-run the installation script `sudo ./install.sh`
- Start the installation by running install.sh shell script file as mentioned below:
```
sudo ./install.sh
```
Once installation is completed without any errors, you will be prompted the following message. 
```CQube installed successfully!!```

<b>Steps Post Installation:</b>

<b>Steps to import Grafana dashboard</b>

- Connect the VPN from local machine
- Open `https://<domain_name>` from the browser and login with admin credentials
- Click on Admin Console
- Click on Monitoring details icon
- New tab will be loaded with grafana login page on `http://<private_ip_of_cqube_server>:9000`
- Default username is admin and password is admin
- Once your logged in change the password as per the need
- After logged in. Click on Settings icon from the left side menu. 
- Click Data Sources 
- Click on Add data source and select Prometheus 
- In URL field, fill `http://<private_ip_of_cqube_server>:9090` Optionally configure the other settings.
- Click on Save
- On home page, click on '+' symbol and select Import
- Click on `Upload JSON file` and select the json file which is located in git repository `cQube/development/grafana/cQube_Monitoring_Dashboard.json`  and click Import
- Dashboard is succesfully imported to grafana with the name of cQube_Monitoring_Dashboard

<h2>Upgradation:</h2>

- Open Terminal
- Navigate to the directory where cQube has been downloaded or cloned
```
cd cQube/ansible/installation_scripts/
git checkout release-2.0
```
- Copy the upgradation_config.yml.template to upgradation_config.yml 
`cp upgradation_config.yml.template upgradation_config.yml`
- This script will update the below cQube components:
  - Creates & Updates table,sequence,index in postgresql database
  - Updates NodeJS server side code
  - Updates Angular and Chart JS client side code
  - Updates & configure Apache Nifi template
  - Updates & configure Keycloak
- Fill the configuration details in `upgradation_config.yml` (* all the values are mandatory, make sure to fill the same configuration details which were used during installation)
- Edit using `nano upgradation_config.yml`
- Save and Close the file

- Give the following permission to the install.sh file
```
chmod u+x upgrade.sh
```
- Run the script to update cQube using the non-root user with sudo privilege
- Start the upgradation by running upgrade.sh shell script file as mentioned below:
```
sudo ./upgrade.sh
```
Configuration filled in `upgradation_config.yml` will be validated first. If there is any error during validation, you will be prompted with the appropriate error message and the upgradation will be aborted. Refer the error message and solve the errors appropriately. Restart the upgradation process`sudo ./upgrade.sh`

Once upgradation is completed without any errors, you will be prompted the following message. 
```CQube upgraded successfully!!```
