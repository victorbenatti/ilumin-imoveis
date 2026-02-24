import { StaggeredMenu } from '@/components/StaggeredMenu'

const menuItems = [
  { label: 'Início', link: '/#inicio', ariaLabel: 'Ir para o início' },
  { label: 'Sobre', link: '/#sobre', ariaLabel: 'Ir para sobre' },
  { label: 'Galeria', link: '/#galeria', ariaLabel: 'Ir para galeria' },
  { label: 'Imóveis', link: '/imoveis', ariaLabel: 'Ver todos os imóveis' },
  { label: 'Contato', link: '/#contato', ariaLabel: 'Ir para contato' },
]

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/ilumin.imoveis/' },
  { label: 'WhatsApp', link: 'https://wa.me/5519974113885' },
]

export default function Header() {
  return (
    <StaggeredMenu
      isFixed={true}
      position="right"
      colors={['#1A1008', '#C8962D']}
      accentColor="#C8962D"
      menuButtonColor="#F5EDE0"
      openMenuButtonColor="#F5EDE0"
      changeMenuColorOnOpen={true}
      logoUrl="/logoIluminImoveisSVG-Branca.svg"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      closeOnClickAway={true}
    />
  )
}
