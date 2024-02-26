# projet " Les bruyères "   partie back

Bienvenue dans le projet "Les Bruyères" ! Ce projet consiste en un site de e-commerce destiné à un fleuriste nommé "Les Bruyères".

## Description du Projet

Le projet "Les Bruyères" est un site de e-commerce conçu pour le fleuriste "Les Bruyères". Il vise à augmenter la visibilité et les ventes du fleuriste en offrant une plateforme de vente en ligne de fleurs, plantes et accessoires.

## Fonctionnalités

Le projet comprend les fonctionnalités suivantes :

- Présentation de la boutique et des coordonnées
- Présentation des produits du moment
- Présentation du catalogue de produits
- Panier d'achat avec gestion de la commande rapide
- Contact avec le magasin pour obtenir un devis
- Gestion des utilisateurs et administrateurs
- Fonctionnalités d'administration 


## Convention commit : 
build : changements qui affectent le système de build ou des dépendances externes (npm, make…) \
ci : changements concernant les fichiers et scripts d’intégration ou de configuration (Travis, Ansible, BrowserStack…) \
feat : ajout d’une nouvelle fonctionnalité \
fix : correction d’un bug \
perf : amélioration des performances \
refactor : modification qui n’apporte ni nouvelle fonctionalité ni d’amélioration de performances \
style : changement qui n’apporte aucune alteration fonctionnelle ou sémantique (indentation, mise en forme, ajout d’espace, renommante d’une variable…) \
docs : rédaction ou mise à jour de documentation \
test : ajout ou modification de tests 

Liens utiles pour les commits : 

- https://buzut.net/cours/versioning-avec-git/bien-nommer-ses-commits
- https://www.conventionalcommits.org/fr/v1.0.0/


## Installation

1. **Cloner le Projet** 
2. **Installer les Dépendances** "npm i"
3. **Configurer la Base de Données**
- Assurez-vous d'avoir une instance PostgreSQL installée et configurée sur votre machine.
- Créez un utilisateur avec un mot de passe.
- Créez une base de données nommée `bruyeres` dans PostgreSQL.

4. **Ajout des Variables d'Environnement**
- Ouvrez un terminal et tapez `nano ~/.bashrc`.
- Insérez les lignes suivantes :
  ```
  export PGUSER=ton_utilisateur
  export PGPASSWORD=ton_mot_de_passe
  ```
- Appuyez sur `Ctrl + X` pour quitter l'éditeur, puis `O` pour confirmer la sauvegarde et appuyez sur `Enter`.
- Fermez tous les terminaux ouverts sur la machine.

5. **Configurer Sqitch**
- Créez un fichier `sqitch.conf` à la racine et copiez-y le contenu du fichier `sqitch.example.conf`.
- Décommentez la ligne `[engine "pg"]` et la ligne `target`, en renseignant le nom de la base de données.
- Exécutez `sqitch deploy` dans le terminal.

6. **Seeding**
- N'oubliez pas d'importer le fichier de seeding `seedingGPT.sql` du dossier `data`, ou lancez simplement le script `db:reset`.

7. **Configurer les Variables d'Environnement**
- Créez un fichier `.env` à la racine du répertoire.
