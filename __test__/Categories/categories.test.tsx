import { render, screen, waitFor } from '@testing-library/react';
import  Categories  from '@/pages/categories/index';
import userEvent from '@testing-library/user-event';

// Mock fetch globally
global.fetch = jest.fn();

describe('Categories Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    (fetch as jest.Mock).mockClear();
  });

  it('fetches and displays categories correctly', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' }
    ];

    // Mock the fetch response
    (fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategories)
      })
    );

    render(<Categories />);

    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for categories to be displayed
    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Clothing')).toBeInTheDocument();
    });
  });

  it('testing search functionality', async () => {
    render(<Categories />);
    const user = userEvent.setup();
    const searchInput = screen.getByRole('searchbox', { name: /search products/i });
    await user.type(searchInput, 'Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  }); 

  it('handles fetch error gracefully', async () => {
    // Mock fetch to reject
    (fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Categories />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error loading categories/i)).toBeInTheDocument();
    });
  });
});
