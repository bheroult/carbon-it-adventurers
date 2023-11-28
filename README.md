# carbon-it-explorers
Test technique pour Carbon IT

Développé sous Node 20.9.0

## Commandes
Jouer les instructions : 
```bash
npm run treasure-hunt
```

Faire tourner les tests :
```bash
npm run test
```

Executer le linter : 
```bash
npm run lint
```

## Emplacement des fichiers d'entrée et sortie
Les fichiers entries.txt et output.txt doivent être placés à la racine du projet pour être exploités.

## Format des fichiers d'entrée et de sortie
Chaque ligne d'instructions doit fournir une coordonnée disincte des autres lignes, ce afin de ne pas avoir plusieurs éléments sur la même case au début du jeu. Si un élément ou un aventurier ne peut être placé pour établir le plateau de jeu, une erreur sera levée.

Les commentaires commencent par un #

### Carte
Les dimmensions de la carte sont précisées sur une ligne comme suit : `C - {largeur} - {hauteur}`

Une seule dimension de carte ne peut être précisée. Le cas échéant une erreur est retournée.

### Montagne
Une montagne est précisée sur une ligne comme suit : `M - {coordX} - {coordY}`

On peut placer autant de montagnes que l'on souhaite, dans la limite de ce que la carte permet.

### Trésor
Un trésor est spécifié sur une ligne comme suit : `T - {coordX} - {coordY} - {nombre de trésors}`

On peut donc avoir plusieurs trésors sur une même case.

### Aventurier
Un aventurier est spécifié sur une ligne comme suit : `A - {nom aventurier} - {coordX} - {coordY} - {orientation} - {déplacements}`

Une orientation peut être N, S, E, O. Un déplacement peut être A (avancer), D (droite), G (gauche). Au cours du jeu, si un déplacement ne peut pas être joué, il sera ignoré, mais le coup suivant sera tout de même tenté.

Tous les aventuriers n'ont pas besoin d'avoir le même nombre de mouvements.
