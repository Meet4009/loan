const formTemplates = {
    direct: `
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="date" class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="date" id="date">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_name" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="party_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_mono" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Mo.No.</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="party_mono">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="property_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="property_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="builder_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Builder Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="builder_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="reference"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Reference</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="reference">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Party Profile</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="party_profile">
                                                    <option>Salary</option>
                                                    <option>Business</option>
                                                    <option>Pinal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document Check</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document_check">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="bank" class="col-sm-3 col-form-label text-left text-sm-center">Bank</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="bank">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">status</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="status">
                                                    <option>Pending</option>
                                                    <option>Reject</option>
                                                    <option>Hold</option>
                                                    <option>Done</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Cost</h4>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="pf" class="col-sm-3 col-form-label text-left text-sm-center">PF</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="pf">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="rm" class="col-sm-3 col-form-label text-left text-sm-center">RM</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="rm">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="stemp" class="col-sm-3 col-form-label text-left text-sm-center">Stamp
                                                Paper</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="stemp">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="tcvr" class="col-sm-3 col-form-label text-left text-sm-center">TCR-VR</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="tcvr">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="c_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">C.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="c_astiment">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="ework" class="col-sm-3 col-form-label text-left text-sm-center">E-Work</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="ework">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="b_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">B.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="b_astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="vahivat"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Vahivat</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="vahivat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="loan_fees" class="col-sm-3 col-form-label text-left text-sm-center">Loan
                                                Fees</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="loan_fees">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Follow Up</h4>
                                </div><!--end col-->
                                <div class="col-auto align-self-center">
                                    <a href="#" class="btn btn-sm btn-outline-primary" id="add-follow-up">
                                        <span class="day-name" id="Day_Name">Add Follow Up</span>
                                    </a>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-primary px-5 py-2" id="submitBtn">Submit</button>
                        <button type="reset" class="btn btn-danger px-5 py-2" id="resetbtn">Cancel</button>
                    </div>
                </div>
            </div><!-- container -->
        </div>
    `,
    agent: `
        <!-- Page Content-->
        <div class="page-content">
            <div class="container-fluid">    
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="date" class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="date" id="date">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="agent_name" class="col-sm-3 col-form-label text-left text-sm-center">Agent
                                                Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="agent_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_name" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="party_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_mono" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Mo.No.</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="party_mono">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="property_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="property_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="builder_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Builder Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="builder_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="reference"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Reference</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="reference">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Party Profile</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="party_profile">
                                                    <option>Salary</option>
                                                    <option>Business</option>
                                                    <option>Pinal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document Check</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document_check">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-search-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Bank</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="bank">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">status</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="dropdown">
                                                    <option>Pending</option>
                                                    <option>Reject</option>
                                                    <option>Hold</option>
                                                    <option>Done</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Cost</h4>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="pf" class="col-sm-3 col-form-label text-left text-sm-center">PF</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="pf">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="rm" class="col-sm-3 col-form-label text-left text-sm-center">RM</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="rm">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="stamp" class="col-sm-3 col-form-label text-left text-sm-center">Stamp
                                                Paper</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="stamp">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="tcrvr" class="col-sm-3 col-form-label text-left text-sm-center">TCR-VR</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="tcrvr">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="c_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">C.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="c_astiment">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="ework" class="col-sm-3 col-form-label text-left text-sm-center">E-Work</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="ework">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="b_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">B.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="b_astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="vahivat"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Vahivat</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="vahivat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="loan_fees" class="col-sm-3 col-form-label text-left text-sm-center">Loan
                                                Fees</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="loan_fees">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Follow Up</h4>
                                </div><!--end col-->
                                <div class="col-auto align-self-center">
                                    <a href="#" class="btn btn-sm btn-outline-primary" id="add-follow-up">
                                        <span class="day-name" id="Day_Name">Add Follow-Up</span>
                                    </a>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-primary px-5 py-2" id="Agent-data-add">Submit</button>
                        <button type="reset" class="btn btn-danger px-5 py-2">Cancel</button>
                    </div>
                </div>
            </div><!-- container -->
        </div>
        <!-- end page content -->
    `,
    mehul: `
        <!-- Page Content-->
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="date" class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="date" id="date">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="builder_name" class="col-sm-3 col-form-label text-left text-sm-center">Builder
                                                Name
                                            </label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="builder_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_name" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="party_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_mono" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Mo.No.</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="party_mono">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="property_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Property Name
                                            </label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="property_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="reference"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Reference</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="reference">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="party_profile" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Profile</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="party_profile">
                                                    <option>Salary</option>
                                                    <option>Business</option>
                                                    <option>Pinal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="document"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Document</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="document_check"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Document Check
                                            </label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document_check">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="bank" class="col-sm-3 col-form-label text-left text-sm-center">Bank</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="bank">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="dropdown"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Status</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="dropdown">
                                                    <option>Pending</option>
                                                    <option>Reject</option>
                                                    <option>Hold</option>
                                                    <option>Done</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Cost</h4>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="pf" class="col-sm-3 col-form-label text-left text-sm-center">PF</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="pf">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="rm" class="col-sm-3 col-form-label text-left text-sm-center">RM</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="rm">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="stemppaper" class="col-sm-3 col-form-label text-left text-sm-center">Stamp
                                                Paper</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="stemppaper">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="tcrvr" class="col-sm-3 col-form-label text-left text-sm-center">TCR-VR</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="tcrvr">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="c_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">C.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="c_astiment">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="ework" class="col-sm-3 col-form-label text-left text-sm-center">E-Work</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="ework">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="b_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">B.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="b_astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="vahivat"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Vahivat</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="vahivat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="loan_fees" class="col-sm-3 col-form-label text-left text-sm-center">Loan
                                                Fees</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="loan_fees">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Follow Up</h4>
                                </div><!--end col-->
                                <div class="col-auto align-self-center">
                                    <a href="#" class="btn btn-sm btn-outline-primary" id="add-follow-up">
                                        <span class="day-name" id="Day_Name">Add Follow Up</span>
                                    </a>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-primary px-5 py-2 add-builder-data">Submit</button>
                        <button type="reset" class="btn btn-danger px-5 py-2">Cancel</button>
                    </div>
                </div>
            </div><!-- container -->
        </div>
        <!-- end page content -->
    `,
    kamlesh: `
        <!-- Page Content-->
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="date" class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="date" id="date">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="builder_name" class="col-sm-3 col-form-label text-left text-sm-center">Builder
                                                Name
                                            </label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="builder_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_name" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="party_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_mono" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Mo.No.</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="party_mono">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="property_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Property Name
                                            </label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="property_name">
                                            </div>
                                        </div>

                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="reference"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Reference</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="reference">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="party_profile" class="col-sm-3 col-form-label text-left text-sm-center">Party
                                                Profile</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="party_profile">
                                                    <option>Salary</option>
                                                    <option>Business</option>
                                                    <option>Pinal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="document"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Document</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="document_check"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Document Check
                                            </label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document_check">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="bank" class="col-sm-3 col-form-label text-left text-sm-center">Bank</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="bank">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="dropdown"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Status</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="dropdown">
                                                    <option>Pending</option>
                                                    <option>Reject</option>
                                                    <option>Hold</option>
                                                    <option>Done</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Cost</h4>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="pf" class="col-sm-3 col-form-label text-left text-sm-center">PF</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="pf">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="rm" class="col-sm-3 col-form-label text-left text-sm-center">RM</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="rm">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="stemppaper" class="col-sm-3 col-form-label text-left text-sm-center">Stamp
                                                Paper</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="stemppaper">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="tcrvr" class="col-sm-3 col-form-label text-left text-sm-center">TCR-VR</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="tcrvr">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="c_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">C.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="c_astiment">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="ework" class="col-sm-3 col-form-label text-left text-sm-center">E-Work</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="ework">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="b_astiment"
                                                class="col-sm-3 col-form-label text-left text-sm-center">B.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="b_astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="vahivat"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Vahivat</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="vahivat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="loan_fees" class="col-sm-3 col-form-label text-left text-sm-center">Loan
                                                Fees</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="loan_fees">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Follow Up</h4>
                                </div><!--end col-->
                                <div class="col-auto align-self-center">
                                    <a href="#" class="btn btn-sm btn-outline-primary" id="add-follow-up">
                                        <span class="day-name" id="Day_Name">Add Follow Up</span>
                                    </a>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-primary px-5 py-2 add-builder-data">Submit</button>
                        <button type="reset" class="btn btn-danger px-5 py-2">Cancel</button>
                    </div>
                </div>
            </div><!-- container -->
        </div>
        <!-- end page content -->
    `,

    other: `
    <!-- Page Content-->
        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="example-datetime-local-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="date" id="date">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-password-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Party Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="party_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Party Mo.No.</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="party_mono">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-password-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="property_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="builder_name"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Builder Name</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="builder_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-password-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Reference</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="reference">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Party Profile</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="party_profile">
                                                    <option>Salary</option>
                                                    <option>Business</option>
                                                    <option>Pinal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Document Check</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="document_check">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-search-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Bank</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="text" id="bank">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label text-left text-sm-center">Dropdown</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="dropdown">
                                                    <option>Pending</option>
                                                    <option>Reject</option>
                                                    <option>Hold</option>
                                                    <option>Done</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Cost</h4>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card p-5">
                            <div class="card-body">
                                <div class="row justify-content-end">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">PF</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="pf">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">RM</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="rm">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Stamp Paper</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="stemppaper">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">TCR-VR</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="tcrvr">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">C.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="c_astiment">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">E-Work</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="ework">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">B.Astiment</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="b_astiment">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Vahivat</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="vahivat">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-number-input"
                                                class="col-sm-3 col-form-label text-left text-sm-center">Loan Fees</label>
                                            <div class="col-sm-9">
                                                <input class="form-control" type="number" id="loan_fees">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div><!--end col-->
                </div><!--end row-->
            </div><!-- container -->

            <div class="container-fluid">
                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="row">
                                <div class="col">
                                    <h4 class="page-title">Follow Up</h4>
                                </div><!--end col-->
                                <div class="col-auto align-self-center">
                                    <a href="#" class="btn btn-sm btn-outline-primary" id="add-follow-up">
                                        <span class="day-name" id="Day_Name">Add Follow Up</span>
                                    </a>
                                </div><!--end col-->
                            </div><!--end row-->
                        </div><!--end page-title-box-->
                    </div><!--end col-->
                </div><!--end row-->
                <!-- end page title end breadcrumb -->
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-primary px-5 py-2" id="other-data-add">Submit</button>
                        <button type="reset" class="btn btn-danger px-5 py-2">Cancel</button>
                    </div>
                </div>
            </div><!-- container -->
        </div>
        <!-- end page content -->
    `
};

// Handle role selection change
document.getElementById('roleSelect').addEventListener('change', function (e) {
    const selectedRole = e.target.value;
    const formContainer = document.getElementById('dynamicFormContainer');

    if (selectedRole && formTemplates[selectedRole]) {
        formContainer.innerHTML = formTemplates[selectedRole];
    } else {
        formContainer.innerHTML = '<p class="text-center">Please select a role to continue</p>';
    }
});

// API endpoints for different roles
const API_ENDPOINTS = {
    direct: 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-store',
    agent: 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-insert',
    mehul: 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-data',
    kamlesh: 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-store1',
    other: 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/other-add'
}

document.addEventListener('DOMContentLoaded', function () {
    // Set direct as default role and trigger change event
    const roleSelect = document.getElementById('roleSelect');
    roleSelect.value = 'direct';
    roleSelect.dispatchEvent(new Event('change'));
});

// follow-up functionality
let followUpCount = 1;

// Add this after your existing formTemplates and role selection code
document.addEventListener('click', function (e) {
    // Handle follow-up addition
    if (e.target.closest('#add-follow-up') || e.target.id === 'Day_Name') {
        e.preventDefault();
        const newFollowUp = `
        <div class="row follow-up-section">
            <div class="col-lg-12">
                <div class="card p-5">
                    <div class="card-body">
                        <div class="row justify-content-end">
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-start-date" type="date">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">End Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-end-date" type="date">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-property" type="text">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Description</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-description" type="text">
                                    </div>
                                </div>
                                <div class="col-sm-12 text-right">
                                    <button type="button" class="btn btn-danger remove-follow-up">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        // Insert before the submit buttons row
        const submitRow = document.querySelector('.btn-primary').closest('.row');
        submitRow.insertAdjacentHTML('beforebegin', newFollowUp);
    }

    // Handle follow-up removal
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }

    // Handle form submission for all roles
    if (e.target.classList.contains('btn-primary') && e.target.getAttribute('type') === 'submit') {
        e.preventDefault();
        handleFormSubmission();
    }

    // Handle reset button click for all roles
    if (e.target.classList.contains('btn-danger') && e.target.getAttribute('type') === 'reset') {
        e.preventDefault();
        // Reset all input, select, and textarea fields inside the dynamic form container
        const formContainer = document.getElementById('dynamicFormContainer');
        if (formContainer) {
            formContainer.querySelectorAll('input, select, textarea').forEach(el => {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    el.checked = false;
                } else if (el.tagName.toLowerCase() === 'select') {
                    el.selectedIndex = 0;
                } else {
                    el.value = '';
                }
            });
            // Remove all follow-up sections except the first one (if you want to keep one empty)
            const followUps = formContainer.querySelectorAll('.follow-up-section');
            followUps.forEach((section, idx) => {
                if (idx > 0) section.remove();
            });
        }
    }
});

function addFollowUpSection() {
    const newFollowUp = `
    <div class="row follow-up-section">
        <div class="col-lg-12">
            <div class="card p-5">
                <div class="card-body">
                    <div class="row justify-content-end" id="follow-up-${followUpCount}">
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-start-date" type="date">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">End Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-end-date" type="date">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-property" type="text">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Description</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-description" type="text">
                                </div>
                            </div>
                            <div class="col-sm-12 text-right">
                                <button type="button" class="btn btn-danger remove-follow-up">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const lastFollowUp = document.querySelector('.follow-up-section:last-child');
    if (lastFollowUp) {
        lastFollowUp.insertAdjacentHTML('afterend', newFollowUp);
    }
}

// handle submission of forms
async function handleFormSubmission() {
    const selectedRole = document.getElementById('roleSelect').value;
    if (!selectedRole || !API_ENDPOINTS[selectedRole]) {
        alert('Please select a valid role');
        return;
    }

    // Get all follow-up sections
    const followUpSections = document.querySelectorAll('.follow-up-section');
    const followUps = Array.from(followUpSections).map(section => ({
        start_date: section.querySelector('.follow-start-date').value,
        end_date: section.querySelector('.follow-end-date').value,
        property: section.querySelector('.follow-property').value,
        description: section.querySelector('.follow-description').value
    }));

    // Common form data for all roles
    const formData = {
        date: document.getElementById('date').value,
        party_name: document.getElementById('party_name').value,
        party_mono: document.getElementById('party_mono').value,
        property_name: document.getElementById('property_name').value,
        builder_name: document.getElementById('builder_name').value,
        reference: document.getElementById('reference').value,
        party_profile: document.getElementById('party_profile').value,
        document: document.getElementById('document').value,
        document_check: document.getElementById('document_check').value,
        bank: document.getElementById('bank').value,
        status: selectedRole === 'direct' ?
            document.getElementById('status')?.value :
            document.getElementById('dropdown')?.value,
        pf: Number(document.getElementById('pf').value) || 0,
        rm: Number(document.getElementById('rm').value) || 0,
        stemp: Number(document.getElementById('stamp')?.value || document.getElementById('stemppaper')?.value || 0),
        tcvr: Number(document.getElementById('tcrvr')?.value || document.getElementById('tcvr')?.value || 0),
        vahivat: Number(document.getElementById('vahivat').value) || 0,
        ework: Number(document.getElementById('ework').value) || 0,
        astiment: Number(document.getElementById('astiment').value) || 0,
        b_astiment: Number(document.getElementById('b_astiment').value) || 0,
        c_astiment: Number(document.getElementById('c_astiment').value) || 0,
        loan_fees: Number(document.getElementById('loan_fees').value) || 0,
        follow_up: followUps
    };

    // Add role-specific fields

    if (selectedRole === 'agent') {
        formData.agent_name = document.getElementById('agent_name').value;
        formData.dropdown = document.getElementById('dropdown').value;
    }
    else if (selectedRole === 'mehul' || selectedRole === 'kamlesh') {
        formData.builder_name = document.getElementById('builder_name').value;
        formData.dropdown = document.getElementById('dropdown').value;
    }

    function redirectUser(role) {
        switch (role) {
            case "direct":
                return "index.html";
            case "mehul":
                return "mehul-bhai.html";
            case "kamlesh":
                return "kamlesh-bhai.html";
            case "agent":
                return "agent.html";
            case "other":
                return "other.html";
            default:
                return "index.html";
        }
    }


    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login again');
            window.location.href = 'index.html';
        }

        const response = await fetch(API_ENDPOINTS[selectedRole], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('✅ Data submitted successfully');
            console.log(result);
            const redirectUrl = redirectUser(selectedRole);

            window.location.href = redirectUrl
        } else {
            alert('❌ Error: ' + result.message);
            console.error(result);
        }
    } catch (err) {
        alert('❌ Network error');
        console.error(err);
    }
}
