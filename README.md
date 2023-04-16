# back_end_GameZone

# back_end_GameZone

## installing required framework and dependencies ##

<code>npm init -y<code><br>
<code>npm install express<code><br>
<code>npm install axios<code><br>
<code>npm install cors<code><br>
<code>npm install nodemon<code><br>
<code>npm install pg<code><br>
<code>npm i body-parser<code><br>


-------------------------------------

#  Building the Server.
<ul>
<li> Make the server listen to port</li>
<li> Creating the Home Route '/'</li>
<li> The homeHandler function get the data from an API using GET method</li>
<li> Create a GAMES constructor to shape the data </li>
<li> Map through data using map method and return "title, thumbnail, description, genre, game_url, release_date"</li>
</ul>

-------------------------------------------

#  Building The Database.
<ul>
<li>install database postgres "npm install pg"</</li>
<li>create database "movie_data"</li>
<li>\l to how your tables</li>
<li>create schema.sql file and inside create table games</li>
<li>connect the database with schema.sql using this command ( "psql  -d games_data -f schema.sql")</li>
</ul>

# Add new routes :

* create new route ===> get all Games 
* Routes ====> /DELETE/:id
* Routes ======> /updateGames/:id'


