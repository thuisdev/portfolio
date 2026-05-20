import BlogCard from '../src/components/BlogCard'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

// Blog Card render
describe('Render Blog Card', () => {
    it('should render', () => {
        render(
            <MemoryRouter>
                <BlogCard
                    blogId={1}
                    blogTitle="Test Title"
                    blogImgSrc="test.jpg"
                    blogPrvText="Test preview"
                    blogDate="Jan 1, 2024"
                />
            </MemoryRouter>
        )
    })

    it('should show blogTitle', () => {
        render(
            <MemoryRouter>
                <BlogCard
                    blogId={1}
                    blogTitle="Test Title"
                    blogImgSrc="test.jpg"
                    blogPrvText="Test preview"
                    blogDate="Jan 1, 2024"
                />
            </MemoryRouter>
        )
        expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should show blogPrvText', () => {
        render(
            <MemoryRouter>
                <BlogCard
                    blogId={1}
                    blogTitle="Test Title"
                    blogImgSrc="test.jpg"
                    blogPrvText="Test preview"
                    blogDate="Jan 1, 2024"
                />
            </MemoryRouter>
        )
        expect(screen.getByText('Test preview')).toBeInTheDocument()
    })

    it('should show blogDate', () => {
        render(
            <MemoryRouter>
                <BlogCard
                    blogId={1}
                    blogTitle="Test Title"
                    blogImgSrc="test.jpg"
                    blogPrvText="Test preview"
                    blogDate="Jan 1, 2024"
                />
            </MemoryRouter>
        )
        expect(screen.getByText('Jan 1, 2024')).toBeInTheDocument()
    })

    it('should redirect to single blog', () => {
        render(
            <MemoryRouter>
                <BlogCard
                    blogId={1}
                    blogTitle="Test Title"
                    blogImgSrc="test.jpg"
                    blogPrvText="Test preview"
                    blogDate="Jan 1, 2024"
                />
            </MemoryRouter>
        )
        expect(screen.getByRole('link')).toHaveAttribute('href', '/blogs/1')
    })
})