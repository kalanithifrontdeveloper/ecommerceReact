import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import ItemList from "../Item/ItemList";

function Home(){

    
return (
    <div>
      <Grid>
        <Grid item>
          <Grid>
          <Navbar/>
          </Grid>
       
        </Grid>
        <Grid item>
          <Grid style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"50px"}}>
             <ItemList/>
          </Grid>
        
        </Grid>
      </Grid>
      
      

    </div>
)
}
export default Home;