# TimeVista
FYP Project


INTRODUCTION

TimeVista is a groundbreaking project that encapsulates over four decades of historical climate data, spanning 1980 to 2022, with a singular focus: revolutionizing Pakistan's agricultural landscape. It aims at unlocking predictive insights into:
extreme weather events
crop yield forecasts
crucial water availability trends

At its core, TimeVista is dedicated to the aggregation, preprocessing, and analysis of diverse historical climate datasets sourced from satellites, weather stations, and other relevant sources. This entails meticulous data cleaning, standardization, and the deployment of cutting-edge machine learning algorithms, like LSTM models, to unearth patterns, forecast extreme weather events, predict crop yields, and assess water availability.



PROGRESS OF IMPLEMENTATION

Front End Development (10/15)

Homepage
Climate Analytics Page
Extreme Events Analytics and Forecasting Page
Datasets Available Page
About Us Page
Contact Us Page
Terms of Use/Privacy Policy Page
Interactive Maps Page
Community Forum/Discussion Page
Resources Page
Crop Yield Prediction Page
Water Availability Forecasting Page
Blog/News Page
 Multimedia Gallery Page
 Carbon Emission Tracker

Back End Development (7/11)

Choose a backend technology stack (e.g., Node.js with Express, Python with Django, Ruby on Rails).
Set up a development environment on your local machine.
Choose a hosting provider (e.g., AWS, Google Cloud, Heroku).
Provision a virtual server or container for deploying your backend application.
Install necessary software dependencies, libraries, and packages.
Set up version control using Git for managing your codebase.
Implement continuous integration and deployment (CI/CD) pipelines for automated testing and deployment.
Backend Server Setup:
Configure server security settings, including firewalls, SSH access, and HTTPS.
Set up monitoring and logging solutions to track server performance and detect issues.
Configure backups and disaster recovery mechanisms to ensure data safety.
Database Setup: (5/7)
Choose a database management system (e.g., PostgreSQL, MySQL, MongoDB).
Design the database schema based on your application's data model and requirements.
Set up a development database instance on your local machine.
Choose a database hosting provider or deploy a self-hosted database server.
Provision a database instance or cluster with the required compute and storage resources.
Configure database security settings, including authentication, encryption, and access controls.
Set up database backups and automated snapshots to prevent data loss.


Backend Server Deployment: ()
Prepare your application for deployment by building optimized production-ready artifacts.
Deploy your backend application to the production server or cloud platform.
Configure domain name settings and DNS records to point to your server's IP address.
Set up SSL/TLS certificates to enable HTTPS encryption for secure communication.
Configure load balancers or reverse proxies for distributing traffic and improving scalability.
Test the deployed application thoroughly to ensure proper functionality and performance.

Data Progress: (9/10)
Collection of climate variables data from Google Earth Engine using extraction script
Quality assurance of collected climate variables
Collection of Crop Yield data from Crop Reporting Service, Government of Pakistan
Collection of Water Availability data from Pakistan Bureau of Statistics
Detection of null and missing values
Outlier Detection using Boxplots
Distribution analysis 
Correlation analysis
Univariate, Bivariate and Multivariate analysis
Integration of output data from ML model

Machine Learning Model Progress: (9/12)
Standardization of data by scaling
Sequence generation of time series data for sliding window
Multivariate time series forecasting of climate variables
Preprocessing of seq2seq encoder decoder model data
Establish seq2seq encoder decoder model
Train the seq2seq encoder decoder model
Inference from trained seq2seq encoder decoder model
Preprocessing of crop yield model data
Preprocessing of hydrological model data
Establish the crop model
Establish the hydrological model
Final inference from 3 model architecture
