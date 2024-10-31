export default function NewList({ imie,color,ok}) {

    var clammers =""

    if(ok==true){
        clammers="border w-1/2 bg-green-500"
    } else{
        clammers ="border w-1/2"
    }

    return (
        <div className={clammers}>
            <h1 className={color}>
                {/* text-${color}-500` */}
                {imie}
            </h1>
        </div>
    );
}
