var criteria = [];
var alternative = [];
var nc, na;

$(document).ready(function(){
    $("#CAList").hide();
    $("#getStarted").click();

    $("#formSetUp").on('submit', function(e){
        e.preventDefault();

        nc = $("#jumlahKriteria").val();
        na = $("#jumlahAlternatif").val();
        let content = 
        "<div class='row' id='CAList'>"+
            "<div class='col-md-6'>"+
                "<h5>Daftar Kriteria</h5>"+
                "<table class='table mt-4' id='criteriaList'>"+
                    "<thead></thead>"+
                    "<tbody>"+
                        
                    "</tbody>"+
                    "<tfoot></tfoot>"+
                "</table>"+
            "</div>"+
            "<div class='col-md-6'>"+
                "<h5>Daftar Alternatif</h5>"+
                "<table class='table mt-4' id='alternativeList'>"+
                    "<thead></thead>"+
                    "<tbody>"+
                        
                    "</tbody>"+
                    "<tfoot></tfoot>"+
                "</table>"+
            "</div>"+
        "</div>";

        $("#modalSetUp").modal('hide');
        $("#getStarted").remove();
        $("#main").append(content);

        let criteriaTable = $("#criteriaList tbody");
        let alternativeTable = $("#alternativeList tbody");
        for(let i = 1; i <= nc; i++){
            criteria[i] = [null, []];
            let tr = 
            "<tr>"+
                "<th width='9%'>"+
                    "C"+i+
                "</th>"+
                "<td width='80%'>"+
                    "<input type='text' name='kriteria"+i+"' id='kriteria"+i+"' class='form-control kriteria' placeholder='Nama Kriteria "+i+"' oninput='kriteria(this)' data-id='"+i+"'>"+
                "</td>"+
                "<td width='9%'>"+
                    "<button class='btn btn-pink detailCriteria' data-id='"+i+"' onclick='detailCriteria(this)'  data-toggle='modal' data-target='#modalCriteria'>Detail</button>"+
                "</td>"+
                "<td width='2%'>"+
                    "<span class='text-danger' id='status"+i+"'>x</span>"
                "</td>"+
            "</tr>";

            criteriaTable.append(tr);
        }
        let trCriteria = 
        "<tr>"+
            "<td colspan='4' class='text-center'>"+
                "<button class='btn btn-pink' disabled id='saveCriteria' onclick='saveCriteria(this)'>Next>></button>"+
            "</td>"+
        "</tr>";
        criteriaTable.append(trCriteria);

        for(let i = 1; i <= na; i++){
            alternative[i] = [null];
            let tr = 
            "<tr>"+
                "<th width='9%'>"+
                    "A"+i+
                "</th>"+
                "<td width='80%'>"+
                    "<input type='text' name='alternatif"+i+"' id='alternatif"+i+"' class='form-control alternatif' placeholder='Nama alternatif "+i+"' oninput='alternatif(this)' data-id='"+i+"'>"+
                "</td>"+
                "<td width='9%'>"+
                    "<button class='btn btn-pink detailAlternatif' data-id='"+i+"' onclick='detailAlternatif(this)'  data-toggle='modal' data-target='#modalAlternative'>Detail</button>"+
                "</td>"+
                "<td width='2%'>"+
                    "<span class='text-danger' id='status2"+i+"'>x</span>"
                "</td>"+
            "</tr>";

            alternativeTable.append(tr);
        }
        let trAlternative = 
        "<tr>"+
            "<td colspan='4' class='text-center'>"+
                "<button class='btn btn-pink' disabled id='saveAlternative' onclick='saveAlternative(this)'>Hasil>></button>"+
            "</td>"+
        "</tr>";
        alternativeTable.append(trAlternative);


        $("#CAList").show();
        $("#alternativeList").parent().hide();
    });

    $("#formCriteria").on("submit", function(e){
        e.preventDefault();
        let id = $(this).data('id');
        let nci = $("#nCi").val();
        
        criteria[id][0] = $("#bobot").val();
        criteria[id][2] = $("#jenis").val();
        let category = criteria[id][1];
        for(let i = 0; i < nci; i++){
            category[i] = [$("#bobotKategori"+i).val(), $("#kategori"+i).val()];
        }

        $("#bobot").val('');
        $("#nCi").val('');
        $("#modalCriteria").modal('hide');

        checkValidation(criteria, id);
    });

    $("#formAlternative").on("submit", function(e){
        e.preventDefault();
        let id = $(this).data('id');

        for(let i = 1; i <= nc; i++){
            alternative[id][i] = $("#kriteriaAlternatif"+i).val();
        }
        
        $("#modalAlternative").modal('hide');
        checkAlternative(alternative, id);
    });

    $("#nCi").on("input", function(e){
        let n = $(e.target).val();
        let criteriaCategoryList = $("#criteriaCategoryList tbody");
        
        criteriaCategoryList.html('');
        for(let i = 0; i < n; i++){
            let tr =
            "<tr>"+
                "<td width='40%'>"+
                    "<input type='text' name='kategori"+i+"' class='form-control kategori' data-id='"+i+"' placeholder='Kategori "+(i+1)+"' required id='kategori"+i+"'>"+
                "</td>"+
                "<td width='20%'>"+
                    "<input type='number' name='bobotKategori"+i+"' class='form-control bobotKategori' data-id='"+i+"' placeholder='Bobot' required id='bobotKategori"+i+"'>"+
                "</td>"+
            "</tr>";

            criteriaCategoryList.append(tr);
        }
    });
});

function kriteria(e){
    let id = $(e).data('id');
    checkValidation(criteria, id);
}

function alternatif(e){
    let id = $(e).data('id');
    checkAlternative(alternative, id);
}

function detailCriteria(e) {
    let id = $(e).data('id');
    let judul = $("#kriteria"+id).val();
    $("#formCriteria").data('id', id);
    $("#modalCriteriaLabel").html(judul);

    if(criteria[id][0] != null){
        $("#bobot").val(criteria[id][0]);
        $("#nCi").val(criteria[id][1].length);
        $("#nCi").trigger("input");

        for(let i = 0; i < $("#nCi").val(); i++){
            $("#bobotKategori"+i).val(criteria[id][1][i][0]);
            $("#kategori"+i).val(criteria[id][1][i][1]);
        }
    }else{
        $("#bobot").val('');
        $("#nCi").val('');
        $("#criteriaCategoryList tbody").html('');
    }
}

function detailAlternatif(e){
    let id = $(e).data('id');
    let judul = $("#alternatif"+id).val();
    $("#formAlternative").data('id', id);
    $("#modalAlternativeLabel").html(judul);
    $("#bodyAlternative").html('');

    for(let i = 1; i < criteria.length; i++){
        let tr = 
        "<div class='form-group'>"+
            "<label for='kriteriaAlternatif"+i+"'>"+$("#kriteria"+i).val()+"</label>"+
            "<select class='form-control' name='kriteriaAlternatif"+i+"' required id='kriteriaAlternatif"+i+"'>"+
                "<option value='' "; if(alternative[id][i] == null) { tr += "selected"; } tr += " disabled>Pilih Kategori</option>";
                for(let j = 0; j < criteria[i][1].length; j++){
                    tr +=
                    "<option value='"+criteria[i][1][j][0]+"' "; if(alternative[id][i] == criteria[i][1][j][0]){ tr += "selected"; } tr += ">"+criteria[i][1][j][1]+"</option>";
                }
                tr +=    
            "</select>"+
        "</div>";
        $("#bodyAlternative").append(tr);
    }

}

function checkValidation(array, id){
    if(array[id][0] != null && $("#kriteria"+id).val() != ''){
        $("#status"+id).html('v');
        $("#status"+id).attr('class', 'text-success');
    }else{
        $("#status"+id).html('x');
        $("#status"+id).attr('class', 'text-danger');
    }

    let validate = true;
    for(let i = 1; i <= array.length; i++){
        if(array[i]){
            if(array[i][0] == null || $("#kriteria"+i).val() == ''){
                validate = false;
            }
        }
    }
    if(validate == true){
        $("#saveCriteria").prop('disabled', false);
    }else{
        $("#saveCriteria").prop('disabled', true);
    }
}

function checkAlternative(array, id){
    if(array[id].length > 1 && $("#alternatif"+id).val() != ''){
        $("#status2"+id).html('v');
        $("#status2"+id).attr('class', 'text-success');
    }else{
        $("#status2"+id).html('x');
        $("#status2"+id).attr('class', 'text-danger');
    }

    let validate = true;
    for(let i = 1; i <= array.length; i++){
        if(array[i]){
            if(array[id].length == 1 && $("#alternatif"+id).val() == ''){
                validate = false;
            }
        }
    }

    if(validate == true){
        $("#saveAlternative").prop('disabled', false);
    }else{
        $("#saveAlternative").prop('disabled', true);
    }
}

function saveCriteria(e){
    $("#criteriaList input").prop('disabled', true);
    $("#criteriaList button").prop('disabled', true);
    $("#alternativeList").parent().show();
}

function saveAlternative(e){
    $("#alternativeList input").prop('disabled', true);
    $("#alternativeList button").prop('disabled', true);
    calculate();
}

function calculate(){
    let r = [];
    let yp = [];
    let yn = [];
    let dp = [];
    let dn = [];
    let v = [];

    for(let i = 1; i <= nc; i++){
        let x = 0;
        for(let j = 1; j <= na; j++){
            x += alternative[j][i] * alternative[j][i];
        }
        x = Math.sqrt(x);

        let s = [];
        let max = 0;
        let min = 1000000;
        for(let j = 1; j <= na; j++){
            s[j] = (alternative[j][i]/x) * criteria[i][0];
            if(s[j] > max){
                max = s[j];
            }
            if(s[j] < min){
                min = s[j];
            }
        }
        if(criteria[i][2] == 1){
            let tmp = max;
            max = min;
            min = tmp;
        }

        r[i] = s;
        yp[i] = max;
        yn[i] = min;
    }

    for(let i = 1; i <= na; i++){
        let dip = 0;
        let din = 0;
        for(let j = 1; j <= nc; j++){
            dip += (r[j][i] - yp[j]) * (r[j][i] - yp[j]);
            din += (r[j][i] - yn[j]) * (r[j][i] - yn[j]);
        }
        dp[i] = Math.sqrt(dip);
        dn[i] = Math.sqrt(din);
        v[i] = dn[i] / (dp[i] + dn[i]);
    }

    let max = 0;
    let maxi;
    let downContent = '';
    for(let i = 1; i < v.length; i++){
        downContent += 
        "<li>"+
            $("#alternatif"+i).val()+" ("+v[i]+")"+
        "</li>";
        if(v[i] > max){
            max = v[i];
            maxi = i;
        }
    }

    let content = 
    "<p class='text-center'>"+
        "Hasil terbaik jatuh pada <b>"+$("#alternatif"+maxi).val()+"</b> dengan skor "+max+". Berikut adalah urutannya:"
    "</p>";
    content += downContent;

    $("#main").append(content);
    // console.log(r);
    // console.log(yp);
    // console.log(yn);
    // console.log(dp);
    // console.log(dn);
    // console.log(v);
}