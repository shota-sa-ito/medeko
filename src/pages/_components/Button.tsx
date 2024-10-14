import * as stylex from '@stylexjs/stylex';

export default function Button() {
  return <button {...stylex.props(styles.button)}>Click me</button>;
}

const styles = stylex.create({
  button: {
    backgroundColor: 'red',
  },
});
