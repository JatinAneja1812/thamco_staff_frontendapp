import React, {useEffect} from 'react'

export default function AllProducts(props) {

    useEffect(() => {
        console.log(props.products);
    }, [props]);

  return (
    <div>AllProducts</div>
  )
}
