app/Http/Controllers/
- copy PhotoController.php
functions/
- copy index.js
functions/src/
- copy:
	- addChild.js
	- addParent.js
	- addSpouse.js
public/assets/css/
- add album.css
- copy clanalbum.css
public/assets/img/
- copy icons folder
public/assets/js/
- delete:
	- clanalbum.js
	- user_album.js
- copy:
	- album_clan.js
	- album_user.js
	- build-profile.js
	- genealogy.js
	- index.js
	- node_details.js
public/assets/js/gojs/
- copy genogram2.js
resources/views/
- search Clan Album (case sensitive) on all blades
- change a href tag of searched item to /album_clan
- add:
	- album_clan.blade.php
	- album_user.blade.php
- delete:
	- clanalbum.blade.php
	- user_album.blade.php
- copy:
	- build-profile.blade.php
	- genealogy.blade.php
routes/
- copy web.php
