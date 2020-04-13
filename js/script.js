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
            alternative[i] = [null, []];
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
                "<button class='btn btn-pink' disabled id='saveAlternative' onclick='saveAlternative(this)'>Next>></button>"+
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
        let category = criteria[id][1];
        for(let i = 0; i < nci; i++){
            category[i] = [$("#bobotKategori"+i).val(), $("#kategori"+i).val()];
        }

        $("#bobot").val('');
        $("#nCi").val('');
        $("#modalCriteria").modal('hide');

        checkValidation(criteria, id);
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
    // console.log(criteria);

    for(let i = 1; i < criteria.length; i++){
        let tr = 
        "<div class='form-group'>"+
            "<label for='kriteriaAlternatif"+i+"'>"+$("#kriteria"+i).val()+"</label>"+
            "<select class='form-control' name='kriteriaAlternatif"+i+"' required>"+
                "<option value='' selected disabled>Pilih Kategori</option>";
                for(let j = 0; j < criteria[i][1].length; j++){
                    tr +=
                    "<option value='"+j+"'>"+criteria[i][1][j][1]+"</option>";
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

function saveCriteria(e){
    $("#criteriaList input").prop('disabled', true);
    $("#criteriaList button").prop('disabled', true);
    $("#alternativeList").parent().show();
}