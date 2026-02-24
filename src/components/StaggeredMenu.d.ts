declare module '@/components/StaggeredMenu' {
    interface StaggeredMenuItem {
        label: string
        link: string
        ariaLabel?: string
    }

    interface StaggeredMenuSocialItem {
        label: string
        link: string
    }

    interface StaggeredMenuProps {
        position?: 'left' | 'right'
        colors?: string[]
        items?: StaggeredMenuItem[]
        socialItems?: StaggeredMenuSocialItem[]
        displaySocials?: boolean
        displayItemNumbering?: boolean
        className?: string
        logoUrl?: string
        menuButtonColor?: string
        openMenuButtonColor?: string
        accentColor?: string
        changeMenuColorOnOpen?: boolean
        isFixed?: boolean
        closeOnClickAway?: boolean
        onMenuOpen?: () => void
        onMenuClose?: () => void
    }

    export const StaggeredMenu: React.FC<StaggeredMenuProps>
    export default StaggeredMenu
}
