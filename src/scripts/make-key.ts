/* eslint-disable no-console -- its a CLI app lmao */
import { cancel, intro, isCancel, outro, text } from '@clack/prompts';
import { createApiKey } from '../utils/auth';

intro(`make-key`);

const id = await text({
  message: 'What ID do you want to give your key?',
  validate(value) {
    if (value.length === 0) return 'Cannot be empty';
  },
});

if (isCancel(id)) {
  cancel();
  process.exit(0);
}

outro(`Key has been made:`);
console.log(createApiKey(id));
