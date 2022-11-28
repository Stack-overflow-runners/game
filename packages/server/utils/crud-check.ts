import User from '../models/user.model';

async function crudCheck() {
  const create = new User({
    userId: 1,
    email: 'test@ya.ru',
    name: 'name',
    lastname: 'lastname',
  });
  await create.save();
  const read = await User.findOne({ where: { email: 'test@ya.ru' } });
  const update = await User.update(
    { name: 'nameUpdated' },
    { where: { email: 'test@ya.ru' } }
  );
  const Delete = await User.destroy({ where: { name: 'nameUpdated' } });
  const CRUD = create && read && update && Delete;

  if (CRUD) {
    console.log('CRUD operations success');
    return true;
  }
  console.log('CRUD operations failed');
  return false;
}

export default crudCheck;
