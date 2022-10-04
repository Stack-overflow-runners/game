import { withNaming } from '@bem-react/classname';

const cn = (block: string) => (element?: string, modifier?: any) => {
  const preset = { e: '__', m: '_', v: '_' };
  const baseCn = withNaming(preset);

  return baseCn(block, element)(modifier);
};

export default cn;
