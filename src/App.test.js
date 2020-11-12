import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without errors', () => {
  render(<App />);
  const app = screen.getByTestId("app-component");
  expect(app).toBeInTheDocument();
});
