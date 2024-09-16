<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Modernize Free</title>
  <link rel="shortcut icon" type="image/png" href="./admin/images/logos/favicon.png" />
  <link rel="stylesheet" href="./admin/css/styles.min.css" />
  <style>
    .card-body {
    background-color: #f8f9fa;
    border-radius: 8px;
}

.statistics {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #dee2e6;
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-title {
    font-size: 1.1rem;
    color: #495057;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
}

.badge {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.375rem;
}
.events-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
        }

        .events-container h2 {
            margin-bottom: 10px;
            color: black;
        }

        .event-card {
            background-color:  rgb(216, 26, 26);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .event-card h3 {
            margin: 0 0 10px;
            color:  white;
        }

        .event-card p {
            margin: 0;
            color: white;
        }

        .no-events {
            color: black;
        }

  </style>
</head>

<body>
  <!--  Body Wrapper -->
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <!-- Sidebar Start -->
   @include('admin.sidebar')
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item d-block d-xl-none">
              <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                <i class="ti ti-menu-2"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-icon-hover" href="javascript:void(0)">
                <i class="ti ti-bell-ringing"></i>
                <div class="notification bg-primary rounded-circle"></div>
              </a>
            </li>
          </ul>
          <!-- <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">

              <li class="nav-item dropdown">
                <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                  aria-expanded="false">

                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                  <div class="message-body">
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-user fs-6"></i>
                      <p class="mb-0 fs-3">My Profile</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-mail fs-6"></i>
                      <p class="mb-0 fs-3">My Account</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-list-check fs-6"></i>
                      <p class="mb-0 fs-3">My Task</p>
                    </a>
                    <a href="./authentication-login.html" style="background-color: rgb(216, 26, 26) ; color: white;" class="btn btn-outline-white mx-3 mt-2 d-block">Logout</a>
                  </div>
                </div>
              </li>
            </ul>
          </div> -->


          <div class=".fixed-top-corner" style="position:fixed; top:15px; right:65px; z-index: 50; "> <x-app-layout></x-app-layout>
          </div>
        </nav>
      </header>

      <!--  Header End -->
      <div class="container-fluid">
        <!--  Row 1 -->
        <div class="row">
          <div class="col-lg-8 d-flex align-items-strech">
            <div class="card w-100">
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Donation Overview</h5>
                  </div>
                  <div>
                    <select class="form-select">
                      <option value="1">March 2024</option>
                      <option value="2">April 2024</option>
                      <option value="3">May 2024</option>
                      <option value="4">June 2024</option>
                    </select>
                  </div>
                </div>
                <div id="chart"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <!-- Yearly Breakup -->
                <div class="card overflow-hidden">
                  <div class="card-body p-4">
                    <h5 class="card-title mb-9 fw-semibold">Donation History</h5>
                    <div class="row align-items-center">
                      <div class="col-8">
                        <h4 class="fw-semibold mb-3">Total Donations</h4>
                        <div class="d-flex align-items-center mb-3">
                          <span
                            class="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-up-left text-success"></i>
                          </span>
                          <p class="text-dark me-1 fs-3 mb-0">+9%</p>
                          <p class="fs-3 mb-0">last year</p>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="me-4">
                            <span style="background-color: rgb(216, 26, 26);" class="round-8  rounded-circle me-2 d-inline-block"></span>
                            <span class="fs-2">2024</span>
                          </div>
                          <div>
                            <span style="background-color: rgb(216, 26, 26);" class="round-8  rounded-circle me-2 d-inline-block"></span>
                            <span class="fs-2">2023</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="d-flex justify-content-center">
                          <div id="breakup"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="col-lg-12">
                <!-- Monthly Earnings -->
                <div class="card">
                  <div class="card-body">
                    <div class="row alig n-items-start">
                    <div class="events-container">
    <h2>Upcoming Events</h2>

    <!-- Example of an upcoming event -->
    <div class="event-card">
        <h3>Blood Donation Camp</h3>
        <p>Date: September 25, 2024</p>
        <p>Location: Community Center, City XYZ</p>
    </div>

    <!-- Example of a "Coming Soon" message -->
    <div class="no-events">
        <p>Stay tuned for more upcoming events!</p>
    </div>
</div>
                      <div class="col-4">
                        <div class="d-flex justify-content-end">

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

          <div class="col-lg-8 d-flex align-itemstext-nowrap">
            <div class="w-100">
              <div class=" p-4">
                <h5 class="card-title fw-semibold mb-4">Volunteer Details</h5>
                <div class="">
                  <table class="table table-bordered table-striped text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                      <tr>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Id</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Name</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Email</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Phone</h6>
                        </th>

                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Role</h6>
                        </th>
                        <th class="border-bottom-0">
                            <h6 class="fw-semibold mb-0">Permission</h6>
                          </th>
                    </thead>

                      @if (session('status'))
                      <script>
                          document.addEventListener('DOMContentLoaded', function() {
                              alert("{{ session('status') }}");
                          });
                      </script>
                  @endif
                    <tbody>
                        @foreach( $volunteer_details as $v_details )
                      <tr>
                        <td class="border-bottom-0 mb-0 fw-bold">{{$v_details->id}}</td>
                        <td class="border-bottom-0 mb-0 fw-bold">{{$v_details->name}}</td>
                        <td class="border-bottom-0 mb-0 fw-bold">{{$v_details->email}}</td>
                        <td class="border-bottom-0 mb-0 fw-bold">{{$v_details->contact}}</td>
                        <td class="border-bottom-0 mb-0 fw-bold">{{$v_details->role}}</td>
                        <td>
                            <form action="{{ route('admin.updateVolunteerStatus', $v_details->id) }}" method="POST">
                                @csrf
                                @method('PATCH')
                                <select name="status" onchange="this.form.submit()">
                                    <option value="pending" {{ $v_details->status == 'pending' ? 'selected' : '' }}>Pending</option>
                                    <option value="approved" {{ $v_details->status == 'approved' ? 'selected' : '' }}>Approved</option>
                                    <option value="rejected" {{$v_details->status == 'rejected' ? 'selected' : '' }}>Rejected</option>
                                </select>
                            </form>
                        </td>
                      </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>







      </div>
    </div>
  </div>
  <script src="./admin/libs/jquery/dist/jquery.min.js"></script>
  <script src="./admin/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="./admin/js/sidebarmenu.js"></script>
  <script src="./admin/js/app.min.js"></script>
  <script src="./admin/libs/apexcharts/dist/apexcharts.min.js"></script>
  <script src="./admin/libs/simplebar/dist/simplebar.js"></script>
  <script src="./admin/js/dashboard.js"></script>
</body>

</html>
