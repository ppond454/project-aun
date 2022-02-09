import { useContext } from 'react';

import '../App.css';
import { contextSession } from '../App';



function Duration1( ) {
      const { setRange , setTimeRange } = useContext(contextSession)

   
    const range = [
       {
            _range: "1",
            _time: "09.00-10:30"
        },
        {
            _range: "2",
            _time: "10:30-12:00"
        },
        {
            _range: "3",
            _time: "13:00-14:30"
        },
        {
            _range: "4",
            _time: "14:30-16:00"
        },

    ]
  



    return (

        <div  >
            

            <h2 className="p3"  >กรุณาเลือกช่วงเวลา</h2>
            <br></br><br></br>
            <div className="dura" style={{textAlign:"center"}}>
                <div style={{ display: "inline-flex" }}  >
                    {
                        range.map((val, i) => (
                            <div key={i}>
                                <button
                                    type="button"
                                    class="btn btn-outline-info"
                                    style={{
                                        margin: "20px" 
                                    }}
                                    onClick={() => {
                                        setRange(val._range)
                                        setTimeRange(val._time)
                                        localStorage.setItem("range", val._range)
                                        localStorage.setItem("timerange", val._time)

                                    }}
                                    className="buttonD1"  >{`ช่วงที่ ${val._range} ${val._time}`}</button>

                            </div>
                        ))
                    }
                </div>
                <br></br><br></br><br></br><br></br>

            </div>



        </div>
    );
}
export default Duration1;