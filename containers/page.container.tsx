
interface ContainerSchema {
    children: JSX.Element[] | JSX.Element
}

export default function PageContainer({children} : ContainerSchema ){
    return(
        <div>
            {children}
        </div>
    )
}