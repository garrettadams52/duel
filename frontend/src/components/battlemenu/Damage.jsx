function Damage(turn, charStats, enemyData, move){
    let attacker = ''
    let defender = ''
    let damage = 0
    turn == 'Player One' ? (attacker = charStats, defender = enemyData) : (attacker = enemyData,defender = charStats)
    if(!move['magical'])
        damage = ((attacker['strength']/defender['defense'])*move.power*(Math.random() * (1.10 - .90) + .90)).toFixed(2)
    else
        damage = ((attacker['wisdom']/defender['spirit'])*move.power*(Math.random() * (1.10 - .90) + .90)).toFixed(2)

    const hitProb = (5*move['accuracy']+45+((attacker['accuracy']-defender['evasion'])/2))*(Math.random() * (1.10 - .90) + .90)
    const perc = (Math.random() * (100 - 1) + 1)
    if(perc>hitProb)
        return 0

    return damage

}

export default Damage