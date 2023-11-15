import logo from '../../public/logo.png'

export default function ApplicationIcon(props: { width: number | string }) {

    return (
        <img src={'/logo.png'} alt="logo" width={props.width} />
    )
}