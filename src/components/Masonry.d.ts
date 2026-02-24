declare module '@/components/Masonry' {
    interface MasonryItem {
        id: number | string
        img: string
        height: number
        url?: string
    }

    interface MasonryProps {
        items: MasonryItem[]
        ease?: string
        duration?: number
        stagger?: number
        animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random'
        scaleOnHover?: boolean
        hoverScale?: number
        blurToFocus?: boolean
        colorShiftOnHover?: boolean
    }

    const Masonry: React.FC<MasonryProps>
    export default Masonry
}
