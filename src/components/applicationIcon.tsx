import logo from '../../public/logo.png'

export default function ApplicationIcon(props: { width: number | string }) {

    return (
        <img src={logo.src} alt="logo" width={props.width} />
    )
}