import User from '../models/user.model';

async function crudCheck() {
  const C = new User({
    userId: 1,
    email: 'test@ya.ru',
    name: 'name',
    lastname: 'lastname',
  });
  await C.save();
  const R = await User.findOne({ where: { email: 'test@ya.ru' } });
  const U = await User.update(
    { name: 'nameUpdated' },
    { where: { email: 'test@ya.ru' } }
  );
  const D = await User.destroy({ where: { name: 'nameUpdated' } });
  const CRUD = C && R && U && D;

  if (CRUD) {
    console.log('CRUD operations success');
    return true;
  }
  console.log('CRUD operations failed');
  return false;
}

export default crudCheck;
