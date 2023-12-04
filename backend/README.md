# Backend - EasySwimAPI

**Run and test preferably through the container**

To Run local the backend you need to do this steps:
### Step 1: Navigate to the Project Directory

Move into the newly created project directory:

```bash
cd easyswim 
```

### Step 2: Run the Development Server

Once you're inside your project directory, start the Django development server by running:

```bash
python manage.py runserver
```

The development server will start running, and you'll see output similar to:

```arduino
Django version x.x.x, using settings'myproject.settings''
Starting development server at http://127.0.0.1:8000/ 
```
### Optionals Steps : Access the Django Admin Interface

Open a web browser and navigate to `http://127.0.0.1:8000/`. You should see the Django welcome page if the development server is running correctly.

To access the Django admin interface, go to `http://127.0.0.1:8000/admin/`. 

### Optional Step 1 (Improved): Check for Existing Superuser

Before creating a new superuser, it's essential to verify if one already exists. Run the following command:
```bash
python manage.py createsuperuser --list
```

**If the command returns any existing superusers, you can skip the next step of creating a new one.**

###  Optional Step 2 (Only if Needed): Create Superuser (If None Exist)
**Note: If you need to do this step ask first (on Slack) to [José Pedro Aguiar](https://gestodeprojetohq.slack.com/team/U05UU2RLRJL), [Miguel Ferreira](https://gestodeprojetohq.slack.com/team/U05TLU8B1U6), [Tiago Oliveira](https://gestodeprojetohq.slack.com/team/U05U03UTETV) or to [PM-Miguel Soeiro](https://gestodeprojetohq.slack.com/team/U05U2H8V1AL)**

**If no superuser exists or if you need to create a new one**, run the following command:
```bash
python manage.py createsuperuser
```
Please follow the prompts to create a superuser account only if it's required or if there are no existing superusers.
