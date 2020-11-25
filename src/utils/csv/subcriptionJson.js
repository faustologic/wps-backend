const subcriptionsCSV = async (subcriptionsData) => {
  const subcriptions = []
  let id = 1
  for (let subcription of subcriptionsData.docs) {
    let data = {}
    const {email} = subcription
    data.email = email
    subcriptions.push(data)
    id++
  }
  return subcriptions
}
export default subcriptionsCSV