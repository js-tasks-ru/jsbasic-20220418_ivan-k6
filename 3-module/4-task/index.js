function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age).map(user => `${user.name}, ${user.balance}`);

  return filteredUsers.join('\n');// ваш код...
}
