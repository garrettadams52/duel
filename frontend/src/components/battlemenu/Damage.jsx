function Damage(turn, charStats, enemyData, move){
    let attacker = ''
    let defender = ''
    turn == 'Player One' ? (attacker = charStats, defender = enemyData) : (attacker = enemyData,defender = charStats)
    const damage = ((attacker['strength']/defender['defense'])*move.power*(Math.random() * (1.10 - .90) + .90)).toFixed(2)

    return damage*10

}

export default Damage