import { formatDate } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { dateFormat } from 'app/helpers/utils.functions';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-action-plan-form',
  templateUrl: './action-plan-form.component.html',
  styleUrls: ['./action-plan-form.component.css']
})
export class ActionPlanFormComponent implements OnInit {
  public activity: FormGroup;
  public activities: any = [];
  actionPlan: any;
  activityChanges: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActionPlanFormComponent>,
    private loader: AppLoaderService,
    private curdService: CRUDService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.actionPlan = this.data.payload;
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record: any) {
    this.activity = new FormGroup({
      activity: new FormControl('', [Validators.required]),
      responsible : new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      deadline: new FormControl('', [Validators.required]),
    });

    this.activity.controls['deadline'].setValue(dateFormat(new Date(), "MM/DD/yyyy"));
    this.getActionPlans(record);
  }

  getActionPlans(data: any) {
    this.curdService.GetParams({ unit_id: data.unit_id, item_area_aspect_id: data.item_area_aspect_id }, "/action-plan").subscribe(res => {
      this.activities = [];
      this.activities = res.body;
      if (this.activities.length > 0)
        this.actionPlan.actionplan_id = this.activities[0].actionplan_id;
      else
        this.actionPlan.actionplan_id = null;
    })
  }

  saveActionPlan() {
    this.curdService.GetParams(undefined, `/customer/${this.actionPlan.customer_id}`).subscribe(res => {
      
      const customer_name = res.body[0].customer_business_name;
      const newActionPlan = {
        actionplan_id: this.actionPlan.actionplan_id,
        unit_id: this.actionPlan.unit_id,
        item_area_aspect_id: this.actionPlan.item_area_aspect_id,
        user_id: this.actionPlan.user_id,
        actionplan_items: [
          ...this.activities
        ],
        activityChanges: {
          unity_name: this.actionPlan.customer_unity_name,
          aspect_name: this.actionPlan.area_aspect_name,
          customer_name,
          actionplan_items: [...this.activityChanges.map(a => ({ ...a, deadline: dateFormat(a.deadline, "MM/DD/yyyy") }))]
        }
      };  
  
      this.loader.open();
      this.curdService.Save(newActionPlan, true, "/action-plan", null).subscribe(res => {
        this.loader.close();
        this.dialogRef.close("OK");
        this.snackBar.open("Successfully saved action plan", "", { duration: 3000 });
      }, err => {
        this.loader.close();
        this.dialogRef.close("NOK");
        this.snackBar.open("Error in saving action plan: " + err, "", { duration: 5000 });
      })
    })    
  }

  addActivity() {
    const activity = this.activity.value;
    const newActivity = {
      ...activity,
      deadline: dateFormat(activity.deadline, "MM/DD/YY"),
      status: 0,
      actionplan_id: this.actionPlan.actionplan_id,
      fake_id: this.activities.length
    }
    this.activities = [
      ...this.activities,
      newActivity
    ];
    this.activityChanges.push(newActivity);
    this.activity.reset();
        
  }

  removeActivity(data: any) {
    if (data.actionplan_item_id) {
      this.activities = [
        ...this.activities.map(a => ({
          ...a,
          status: a.actionplan_item_id === data.actionplan_item_id ? 3 : a.status
        }))
      ]
      this.activityChanges.push({
        ...data,
        status: 3
      })
    } else {
      this.activities = [
        ...this.activities.filter(a => a.fake_id !== data.fake_id)
      ]
      this.activityChanges = this.activityChanges.filter(a => a.fake_id !== data.fake_id);
    }
  }

  getRealActivities() {
    return this.activities.filter(a => a.status !== 3);
  }

  dateFormat(str_date, str_format) {
    return dateFormat(str_date, str_format);
  }

}
