
Joueur.initJoueur("MJ ",50,50);
	Joueur.xp=33;
	console.log(Joueur.decrire());

Joueur.initJoueur("SAM",100,20);
Joueur.xp=70;
	console.log(Joueur.decrire());

	Joueur.initJoueur("DAMIAN",60,80);
Joueur.xp=55;
	console.log(Joueur.decrire());

adversaire.decrire=function(){
	var description = this.nom + " a " + this.sante + " points de vie " + this.force + " en force  " + this.race + " de race et  " + this.valeur + " du valeur ";
	return description;
};

	adversaire.initadversaire(" Thanos ",150,50,30);
	adversaire.race=10;
	adversaire.valeur=40;
	console.log(adversaire.decrire());