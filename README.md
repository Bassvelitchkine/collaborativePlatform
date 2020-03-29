# Site de création de contenu sur un mode participatif

## Introduction

Je porte un projet entrepreneurial de création de contenu par la communauté que je suis en train d'essayer de rassembler. Le but est que la communauté créé elle-même du contenu écrit et les podcasts associés aux écrits (je reste volontairement vague). Le contenu est hebergé sur différentes plateformes (Instagram pour un aspect plus visuel, et Soundcloud et Anchor.fm pour les audios).

Le projet a bien démarré ainsi mais les membres de la communauté m'ont demandé à plusieurs reprise un endroit où ils pourraient lire les contributions entière des autres membres (on ne peut pas publier de long textes sur Instagram). La demande est revenue plusieurs fois. Par ailleurs, je voulais simplifier le processus de contribution qui jusqu'ici se faisait par mail ou par la messagerie d'Instagram.

De plus, ce nouveau site est une opportunité d'explorer un business model. J'ai inclus une fonctionnalité de téléchargement des scripts et des audios. L'administrateur peut suivre le nombre de téléchargements pour chaque type de contenu.

Enfin, on m'a régulièrement demandé comment s'y prendre techniquement pour contribuer. Il fallait donc une section du site avec des tutoriels pour expliquer comment contribuer aussi bien à l'écrit qu'à l'oral.

## Technologie

### Stack

Il s'agit d'une stack MERN classique.

### Déploiement

Le déploiement a été mis en oeuvre avec le logiciel Docker qui permet d'encapsuler chaque "service" du site dans des conteneurs indépendants les uns des autres mais tout de même "cablés" les uns avec les autres pour pouvoir communiquer.

Pour ce site, il a fallu trois services, un pour le front, un pour le serveur et un pour la base de données mongoDB. Le front communique avec le serveur, le serveur avec le client et la base de données, et la base de données avec le serveur, naturellement.

### Prerequisites

Docker créé lui-même les environnements nécessaires au fonctionnement de chaque service, et ce, dans chaque conteneur. l'avantage pour vous est qu'il vous suffit donc d'[installer Docker Desktop](#https://www.docker.com/products/docker-desktop) (si vous avez Windows 10 Entreprise, sinon [Docker Toolbox](#https://docs.docker.com/toolbox/toolbox_install_windows/) sur votre machine ainsi que Docker Compose.

Nous reviendrons plus tard sur l'installation de Docker Compose.

Il faut également avoir node.js d'installé sur la machine. Je laisse cette installation à votre discrétion.

## Lancement du site

### Etapes préliminaires

#### Clônage

Cloner le dépot git sur votre machine _sans en changer l'architecture_. Nous appellerons `dossier` le dossier dans lequel vous avez cloné le dépôt git.

#### Lancement de Docker

Servez vous de l'outil _Docker Quickstart_ qui a été installé en même temps que Docker. Lorsque Docker a été correctement lancé, une baleine s'affiche et on vous indique l'adresse IP sur laquelle tournera Docker. Il s'agit souvent de _192.168.99.100_. _Notez cette adresse, vous en aurez besoin_.

#### Mise à jour des variables d'environnement

Rendez-vous dans le dossier `dossier/client/`. Ouvrez le fichier `.env.production` et fixer la valeur de la variable d'environnement avec l'adresse IP que vous avez noté à l'étape précédente. Dans mon cas, il s'agit de :

```.env
REACT_APP_URL=http://192.168.99.100
```

#### Configurer un serveur mail (optionnel)

Si vous souhaitez tester les formulaires de soumission de contribution mis a disposition des utilisateurs, il faut que vous configuriez l'envoi des emails. En effet, les utilisateurs remplissent un formulaire sur le site, qui est ensuite envoyé au serveur. Le serveur formatte les données et les envois par mail à une adresse de votre convenance, depuis une adresse de votre convenance (idéalement la même).

Ainsi, il faut remplir plusieurs champs. Pour cela, rendez-vous dans `dossier/server/controllers/submission`et remplissez les lignes suivantes avec les informations adéquates, celles de l'adresse qui envoie les mails :

```javascript
let transporter = nodemailer.createTransport({
  host: "", // A COMPLETER
  port: 465, // A CHANGER EVENTUELLEMENT
  secure: true, // true for 465, false for other ports
  auth: {
    user: "", // L'ADRESSE MAIL DEPUIS LAQUELLE ON ENVOIE
    pass: "" // MOT DE PASSE DE L'ADRESSE MAIL DEPUIS LAQUELLE ON ENVOIE
  }
});
```

Faites de même avec l'adresse de réception :

```javascript
var dataToSend = {
  from: '"Website 👻" <submission@site.com>', // sender address
  to: "", // ADRESSE MAIL QUIE RECOIT LES CONTRIBUTIONS
  subject: "Submission ✔", // Subject line
  text:
    "Pseudo : " +
    req.body.pseudo +
    "\n Contact : " +
    req.body.contact +
    "\n Titre : " +
    req.body.titre +
    "\n Message : " +
    req.body.message, // plain text body
  attachments: arrayAttachments
};
```

#### Sécuriser la base de données

Sans action supplémentaire de votre part, Docker créérait un conteneur mongoDB avec votre base de données à l'intérieur. N'importe qui qui disposerait l'adresse IP de la machine sur laquelle se trouve votre site pourrait y accéder et en modifier le contenu. Vous comprenez bien que c'est un problème et donc que la connexion à la bdd doit être sécurisée.

Pour cela, il faut suivre plusieurs étapes :

1. Ouvrez une invite de commande _bash_ par exemple _git bash_.
2. Rendez-vous dans le dossier `dossier`.
3. Entrez la série de commandes suivantes (attention à _remplacer "dossier" par le nom de votre dossier_) :

```bash
docker run -d -p 27017:27017 -v dossier_database:/data/db mongo
docker ps
```

4. Copiez alors l'identifiant du conteneur que vous verrez s'afficher, au sein duquel se trouve votre future bdd mongodb. Puis poursuivez avec bash :

```bash
docker exec -it idQueVousVenezDeCopier bash
: mongo
> use bdd
> db.createUser({
>... user: 'identifiant',
>... pwd: 'motdepasse',
>... roles: [{role: 'readWrite', db: 'bdd'}]
>... })
```

5. Un message de succès doit s'afficher. Vous venez de sécuriser l'accès à la bdd. Il faut désormais disposer de l'identifiant _identifiant_ et du mot de passe _motdepasse_ pour pouvoir s'y connecter. Poursuivez avec bash :

```bash
>quit()
: exit
docker ps
docker stop idQueVousVenezDeCopier
```

#### Installation de Docker Compose

Toujours avec l'interpréteur en ligne de commande bash, installez le package Docker Compose. Cela est possible car vous avez node.js d'installé sur votre machine.

```bash
npm install --save docker-compose
```

C'est la seule fois où vous aurez besoin d'entrer cette commande.

### Démarrage du site

Toujours avec bash, entrez la commande suivante :

```bash
docker-compose up --build
```

Attendez que docker ait fini la construction des images et le lancement des conteneurs (cela peut prendre plusieurs minutes, Docker a du boulot).

## Utilisation du site

Rendez vous à l'adresse IP que vous a indiqué Docker lorsque vous l'avez lancé. Il vous suffit d'entrer http://adresseIP dans votre navigateur préféré.

### Mode "utilisateur"

Il vous suffit de vous balader dans les différents onglets, et de remplir les formulaires de contribution que vous croiserez (_si vous avez configuré le serveur mail_).

### Mode administrateur

C'est vous qui ajoutez le contenu sur le site. Pour vous rendre vers l'interface utilisateur, il faut que vous vous rendiez à l'adresse : http://adresseIP/admin.

- Connectez-vous alors avec les tokens suivants :
  - id : bidon@live.fr
  - mdp : motdepasse

Vous accédez alors au tableau de bord. Avec 4 boutons :

- _Compteurs_ qui permet de voir combien de fois les scripts et les audios de chaque publication ont été téléchargés
- _Abonnes_ vous permet de voir qui s'est abonné à votre newsletter via le formulaire de la landing page
- _Publications_ vous permet de manipuler la base de données des publications selon la "méthode" _CRUD_. Pour chaque publication, il y a plusieurs champs à remplir :
  - Lien vers Anchor : mettre le lien vers le podcast sur anchor.fm s'il y a déjà un audio pour la contribution, laisser vide sinon
  - Author : l'auteur de la publication
  - Description : une courte description du sujet de la contribution en 100 caractères
  - Audio author : auteur du podcast s'il y en a déjà un, rien sinon
  - Date : date de publication du script
  - Instagram : lien vers la publication Instagram associée au script
  - Lien vers Soundcloud : lien vers le podcast sur Soundcloud s'il y en a un, vide sinon
  - Script : le contenu du script. Séparez les paragraphes en vous servant du délimiteur "§"
  - Titre de la publication : ok
  - Audio : "true" s'il y en a un, "false" sinon
  - Illustration : choisissez une photo au format .jpg pour la contribution
  - Pdf : la publication sous forme de pdf qui pourra être téléchargé par l'utilisateur
  - Audio : le .mp3 du podcast s'il y a un audio, rien sinon

* Sauvegarder la bdd : vous permet d'enregistrer le contenu complet de votre base de données sous forme de document json, pour prévenir les problèmes qui pourraient survenir.

### Pistes

Créer des comptes utilisateurs pour que les utilisateurs puissent se charger de l'upload de leurs publications de bout en bout. Faire payer pour les téléchargements de scripts et d'audios.

## Authors

- **Bastien Velitchkine** - _Initial work_ - [Bassvelitchkine](https://github.com/Bassvelitchkine)
