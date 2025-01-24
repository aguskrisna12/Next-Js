import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/pages/index';
import '@testing-library/jest-dom';
import { ProductInterface } from '@/type/Product';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('HomePage', () => {
  const mockData: ProductInterface[] = [{
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description', 
    images: ['test.jpg'],
    category: {
      id: 1,
      name: 'Test Category',
    }
  }];

  beforeEach(() => {
    global.fetch = jest.fn();
  });
  
  it('fetches data from the API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    render(<HomePage data={[]} />);
    await waitFor(() => expect(screen.getByText('Test Product')).toBeInTheDocument());
  });

  it('renders the homepage with correct elements', () => {
    render(<HomePage data={mockData} />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('displays product information correctly', () => {
    render(<HomePage data={mockData} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test.jpg');
  });


  it('handles loading state correctly', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<HomePage data={[]} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles error state gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<HomePage data={[]} />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
    });
  });


});
