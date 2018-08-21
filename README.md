Pour lancer l'application : ```npm start```
Une fois lancer est accésible à : 
- l'adresse local : [http://localhost:8000](http://localhost:8000)
- l'adresse production : [http://37.187.93.167:8085](http://37.187.93.167:8085)


---
#### Pour ajouter un nouvel utilisateur a la base mongo
- Pour la Base de production
  - Pour ce connecter à la base mongodb sur l'image Docker :
``` docker exec -it contactrh_integration-contactrh-mongo.1.<env> mongo``` 
ou \<env> est remplacer par l'ID du commit correcpondant (```docker ps``` pour voire les images lancées)

  - Pour ecrire dans la base de production :
```use contactrh``` 

- Command pour l'insertion 
  - Pour insérer un nouvel utilisateur dans mongodb : ```db.users.insert( { login: "admin", pwd: "admin" } )```


---
#### Pour Débugguer


- Lancer en ligne de commande dans le terminal : ```npm run debug```
- Dans Visual Studio Code :
  - Activer le Toggle Auto Attach
    - Le message "Debug enabled" doit apparaître dans le terminal
  - Mettre un point d'arrêt dans le code javascript
- Dans Visual Studio Code :
  - Dans la vue DEBUG
  - Dans la liste déroulante à droite de DEBOGUER, sélectionner Ajouter une configuration
  - Sélectionner Node.js
  - Dans le fichier launch.json, Ajouter une configuration "Lancer via NPM"
  - Enregistrer le fichier launch.json

---
#### Activer le debug

- Dans Visual Studio Code:
  - Dans la vue DEBUG, cliquer sur la flèche verte à droite de DEBOGUER
  - Mettre un point d'arrêt dans le fichier PHP
  - Aller sur la page de ce fichier PHP


