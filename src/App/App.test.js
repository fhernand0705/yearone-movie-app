import { render, screen } from '@testing-library/react';
import App from './component';


test('renders app without errors', () => {
  render(<App />);
  const app = screen.getByTestId("app-component");
  expect(app).toBeInTheDocument();
});

