

import React from "react";

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet"/>;
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>

export default function Home() {
    return (

        <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
            <div class="container ">
                
                <ul class="navbar-nav">
                    <span class="navbar-brand" href="#">
                        <img src="data:image/jpeg;base64,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" alt="Logo" style={{ width: 40 }} class="rounded-pill"/>
                    </span>
                    <li> <a class="nav-link active" href="#">Home</a></li>
                    <li> <a class="nav-link active" href="/devices">OMS</a></li>
                    {/* <li> <a class="nav-link active" href="/statistic">StatisticData</a></li> */}
                </ul>
                <ul>
                    <span class="navbar-nav dropdown ">
                       <li> 
                           <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" style={{ color: 'ActiveBorder' }} >smartpH</a>
                       </li>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/signup">Sign up</a></li>
                            <li><a class="dropdown-item" href="/signin">Sign in</a></li>
                            <li><a class="dropdown-item" href="/logout">Log out</a></li>
                        </ul>
                    </span>
                </ul>

            </div>
           

        </nav>
       
    )
}