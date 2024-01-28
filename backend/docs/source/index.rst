.. EasySwim documentation master file, created by
   sphinx-quickstart on Wed Nov 29 02:15:22 2023.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to EasySwim's documentation!
====================================

.. note::

   The documentation covers the EasySwim website https://easyswim.online/ and its associated API. For the most recent version of the code, visit the **EasySwim GitHub repository** https://github.com/GP-GeePeers/easyswim.

.. warning::

    Please be aware that this documentation is a work in progress, and updates are regularly made. If you have any questions, suggestions, or feedback, feel free to reach out to us at  **EasySwim Slack channel** and **EasySwim GitHub repository** https://github.com/GP-GeePeers/easyswim.

Contents
--------
.. toctree::
   :maxdepth: 2

   overview
   problem-description
   current-method
   our-solution
   setup/index
   apicomponents/index
 
Introduction
------------

- :doc:`overview`:  
- :doc:`problem-description`:  
- :doc:`current-method`:  
- :doc:`our-solution`: 
- :doc:`setup/index`: 
- :doc:`apicomponents/index`: 

Feel free to navigate through the documentation to find detailed explanations, code samples, and usage instructions for each component. If you have specific questions or need assistance, check out the relevant sections or reach out to the EasySwim community for support.

We hope EasySwim simplifies your swim management experience. Happy swimming!


Problem Description
-------------------

The process from creating and registering a swim meet to validating and enrolling athletes, and sending this validation back to the meet organizer, is currently cumbersome for both meet organizers and clubs. Our goal is to create a platform that streamlines this entire process.


Current Method
---------------

The current method involves the meet organizer creating the meet in the Meet Manager platform, generating a .lxf file containing essential information about the meet. This file is then sent to Swim Ranking and the participating club via email. The club, using the Team Manager platform, fills in the .lxf file with athlete information and sends it back to the meet organizer. The organizer, through the FPN System, individually validates the athletes' affiliation with FPN and checks the validity of their medical exams until the final date of the meet. The club makes payments for each participating athlete and sends the proof via email to the organizer. At the end of the meet, the organizer sends the results to Swim Rankings.


Our Solution
------------

We aim to create a parallel platform to simplify this process. The meet organizer, after creating the .lxf file in Meet Manager, will send it to our platform. The club retrieves the file from the platform, fills it with athlete information using Team Manager, and sends it back to our platform. Our platform, through the FPN System, checks the athletes' federation affiliation and verifies the validity of their medical exams until the end of the meet. The platform generates a .lxf file with valid athletes and requests payment from the club. After the payment is made, the platform sends this file to the organizer, indicating that the registrations are paid.

