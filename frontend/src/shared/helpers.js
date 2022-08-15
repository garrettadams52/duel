import { getAttacks, getName, getPokemon } from "../api/GetEnemy"

export const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export function Damage(turn, charStats, enemyStats, move){
  let attacker = ''
  let defender = ''
  let damage = 0
  turn == 'Player One' ? (attacker = charStats, defender = enemyStats) : (attacker = enemyStats,defender = charStats)
  if(!move['magical'])
      damage = ((attacker['strength']/defender['defense'])*move.power*(Math.random() * (1.10 - .90) + .90)).toFixed(2)
  else
      damage = ((attacker['wisdom']/defender['spirit'])*move.power*(Math.random() * (1.10 - .90) + .90)).toFixed(2)

  const hitProb = (5*move['accuracy']+45+((attacker['accuracy']-defender['evasion'])/2))*(Math.random() * (1.10 - .90) + .90)
  const perc = (Math.random() * (100 - 1) + 1)
  if(perc>hitProb)
      return 0

  return damage*5

}

export const getEnemyData = async () => {
  const enemyData = {}
  const fields = ['accuracy','defense','evasion','spirit','strength','wisdom']
  const stats = fields.reduce((a,b)=>{
      return {...a, [b]:(Math.floor(Math.random() * (10))+1)}
  },{});
  enemyData['attacks'] = await getAttacks()
  enemyData['pokemon'] = await getPokemon()
  enemyData['name'] = await getName()
  enemyData['stats'] = stats

  return enemyData
}
